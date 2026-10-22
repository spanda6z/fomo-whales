import { NextResponse } from "next/server";
import { confirmPayment } from "@/lib/payments";
import { prisma } from "@/lib/prisma";
import { formatProCallPost } from "@/lib/telegram";
import { config } from "@/lib/config";
import { createHmac, timingSafeEqual } from "crypto";

/**
 * Payment provider webhook.
 * Verify signature before trusting the event.
 * Idempotent via provider event IDs.
 */
export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-webhook-signature") || "";

  if (config.payment.webhookSecret) {
    const expected = createHmac("sha256", config.payment.webhookSecret)
      .update(rawBody)
      .digest("hex");
    try {
      const a = Buffer.from(signature);
      const b = Buffer.from(expected);
      if (a.length !== b.length || !timingSafeEqual(a, b)) {
        return NextResponse.json({ error: "invalid signature" }, { status: 401 });
      }
    } catch {
      return NextResponse.json({ error: "invalid signature" }, { status: 401 });
    }
  }

  let payload: {
    orderRef?: string;
    eventId?: string;
    providerRef?: string;
    status?: string;
  };
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  if (payload.status !== "completed" || !payload.orderRef) {
    return NextResponse.json({ received: true });
  }

  try {
    const order = await confirmPayment({
      orderRef: payload.orderRef,
      providerRef: payload.providerRef,
      providerEventId: payload.eventId,
      payload,
    });

    if (order.promotionId) {
      const promotion = await prisma.promotion.findUnique({
        where: { id: order.promotionId },
        include: {
          channel: true,
          user: { include: { profile: true } },
        },
      });

      if (promotion?.channelId && promotion.status === "PAID") {
        const text = formatProCallPost({
          tokenName: promotion.tokenName || "Token",
          tokenTicker: promotion.tokenTicker || "—",
          chain: promotion.chain || "—",
          contractAddress: promotion.contractAddress,
          promoText: promotion.promoText || "",
          callerUsername: promotion.user.profile?.username,
        });

        const idempotencyKey = `pro-${promotion.id}`;
        await prisma.telegramPublication.upsert({
          where: { idempotencyKey },
          create: {
            promotionId: promotion.id,
            channelId: promotion.channelId,
            status: "QUEUED",
            messageText: text,
            idempotencyKey,
          },
          update: {},
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[webhook/payment]", err);
    return NextResponse.json({ error: "processing failed" }, { status: 500 });
  }
}
