/**
 * Background workers:
 * - Price monitoring + 2× milestone verification
 * - Telegram publication (idempotent)
 * - Payment-driven publish jobs
 */

import { Queue, Worker, Job } from "bullmq";
import { getRedis } from "../src/lib/redis";
import { prisma } from "../src/lib/prisma";
import { fetchTokenPrice, isMilestoneReached } from "../src/lib/price";
import {
  sendChannelMessage,
  formatFreeCallPost,
  formatProCallPost,
} from "../src/lib/telegram";
import { config } from "../src/lib/config";
import { Decimal } from "@prisma/client/runtime/library";

const connection = getRedis();

export const priceQueue = new Queue("price-monitor", { connection });
export const publishQueue = new Queue("telegram-publish", { connection });

const priceWorker = new Worker(
  "price-monitor",
  async (job: Job) => {
    if (job.name === "scan-tracking-calls") {
      await scanTrackingCalls();
    } else if (job.name === "check-call") {
      await checkSingleCall(job.data.callId as string);
    }
  },
  { connection, concurrency: 2 }
);

async function scanTrackingCalls() {
  const calls = await prisma.call.findMany({
    where: { status: "TRACKING" },
    take: 50,
    orderBy: { updatedAt: "asc" },
  });

  for (const call of calls) {
    await checkSingleCall(call.id);
  }
}

async function checkSingleCall(callId: string) {
  const call = await prisma.call.findUnique({ where: { id: callId } });
  if (!call || call.status !== "TRACKING") return;

  const result = await fetchTokenPrice(call.chain, call.tokenAddress || undefined);
  if (!result || !result.reliable) {
    if (result) {
      await prisma.callPriceSnapshot.create({
        data: {
          callId: call.id,
          price: result.price,
          source: result.source,
          liquidityUsd: result.liquidityUsd,
        },
      });
    }
    return;
  }

  const ref = Number(call.referencePrice);
  const current = result.price;

  await prisma.$transaction(async (tx) => {
    await tx.callPriceSnapshot.create({
      data: {
        callId: call.id,
        price: current,
        source: result.source,
        liquidityUsd: result.liquidityUsd,
      },
    });

    const highest = Math.max(Number(call.highestPrice || 0), current);
    await tx.call.update({
      where: { id: call.id },
      data: {
        currentPrice: current,
        highestPrice: highest,
        liquidityUsd: result.liquidityUsd,
      },
    });

    if (isMilestoneReached(ref, current)) {
      try {
        await tx.callMilestone.create({
          data: {
            callId: call.id,
            multiplier: config.milestoneMultiplier,
            priceAtMilestone: current,
            referencePrice: ref,
            evidence: {
              source: result.source,
              liquidityUsd: result.liquidityUsd,
              timestamp: result.timestamp.toISOString(),
            },
          },
        });
      } catch {
        return;
      }

      await tx.call.update({
        where: { id: call.id },
        data: {
          status: "MILESTONE_REACHED",
          milestoneAt: new Date(),
        },
      });
    }
  });

  const updated = await prisma.call.findUnique({ where: { id: callId } });
  if (updated?.status === "MILESTONE_REACHED") {
    const existing = await prisma.telegramPublication.findFirst({
      where: { callId, status: { in: ["QUEUED", "PUBLISHING", "PUBLISHED"] } },
    });
    if (!existing && config.telegramFreeChannelId) {
      const user = await prisma.user.findUnique({
        where: { id: updated.userId },
        include: { profile: true },
      });
      const text = formatFreeCallPost({
        tokenName: updated.tokenName,
        tokenTicker: updated.tokenTicker,
        chain: updated.chain,
        tokenAddress: updated.tokenAddress,
        referencePrice: String(updated.referencePrice),
        currentPrice: String(updated.currentPrice),
        multiplier: String(config.milestoneMultiplier),
        callerUsername: user?.profile?.username,
      });

      const pub = await prisma.telegramPublication.create({
        data: {
          callId: updated.id,
          status: "QUEUED",
          messageText: text,
          idempotencyKey: `free-call-${updated.id}-2x`,
        },
      });

      await publishQueue.add(
        "publish",
        { publicationId: pub.id, chatId: config.telegramFreeChannelId },
        { jobId: pub.idempotencyKey, attempts: 5, backoff: { type: "exponential", delay: 5000 } }
      );
    }
  }
}

const publishWorker = new Worker(
  "telegram-publish",
  async (job: Job) => {
    const { publicationId, chatId } = job.data as {
      publicationId: string;
      chatId: string;
    };

    const pub = await prisma.telegramPublication.findUnique({
      where: { id: publicationId },
    });
    if (!pub) return;
    if (pub.status === "PUBLISHED") return;

    await prisma.telegramPublication.update({
      where: { id: pub.id },
      data: { status: "PUBLISHING", attempts: { increment: 1 } },
    });

    try {
      const result = await sendChannelMessage(chatId, pub.messageText);
      if (!result) {
        throw new Error("Telegram token missing or send returned null");
      }

      await prisma.$transaction(async (tx) => {
        await tx.telegramPublication.update({
          where: { id: pub.id },
          data: {
            status: "PUBLISHED",
            telegramMessageId: result.messageId,
            telegramPostUrl: result.postUrl,
            publishedAt: new Date(),
            lastError: null,
          },
        });

        if (pub.callId) {
          await tx.call.update({
            where: { id: pub.callId },
            data: { status: "PUBLISHED", publishedAt: new Date() },
          });
          await tx.callMilestone.updateMany({
            where: { callId: pub.callId, published: false },
            data: { published: true },
          });
        }

        if (pub.promotionId) {
          await tx.promotion.update({
            where: { id: pub.promotionId },
            data: {
              status: "PUBLISHED",
              publishedAt: new Date(),
              telegramPostUrl: result.postUrl,
            },
          });
        }
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      await prisma.telegramPublication.update({
        where: { id: pub.id },
        data: { status: "FAILED", lastError: message },
      });
      throw err;
    }
  },
  { connection, concurrency: 3 }
);

async function setupSchedules() {
  await priceQueue.add(
    "scan-tracking-calls",
    {},
    {
      repeat: { every: 60_000 },
      jobId: "scan-tracking-calls-repeat",
    }
  );
  console.log("[workers] price scan scheduled every 60s");
}

priceWorker.on("failed", (job, err) => {
  console.error("[price-worker] failed", job?.id, err.message);
});

publishWorker.on("failed", (job, err) => {
  console.error("[publish-worker] failed", job?.id, err.message);
});

setupSchedules().catch(console.error);

console.log("[workers] started");
