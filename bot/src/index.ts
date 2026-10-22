/**
 * Fomo Whales Telegram Bot
 * Users create profiles and calls through the bot.
 * Shares the same database as the website.
 */

import { Bot, InlineKeyboard, session } from "grammy";
import { config } from "../../src/lib/config";
import { prisma } from "../../src/lib/prisma";
import { createProfileSchema, freeCallSchema } from "../../src/lib/validation";
import { createPaymentOrder } from "../../src/lib/payments";
import { fetchTokenPrice } from "../../src/lib/price";

if (!config.telegramBotToken) {
  console.error("TELEGRAM_BOT_TOKEN is required");
  process.exit(1);
}

interface SessionData {
  step?: string;
  draft?: Record<string, string>;
}

const bot = new Bot<import("grammy").Context & { session: SessionData }>(
  config.telegramBotToken
);

bot.use(session({ initial: (): SessionData => ({}) }));

// ─── Helpers ────────────────────────────────────────────────────

async function getUser(telegramId: number) {
  return prisma.user.findUnique({
    where: { telegramId: String(telegramId) },
    include: { profile: true },
  });
}

async function requireProfile(ctx: import("grammy").Context) {
  const from = ctx.from;
  if (!from) return null;
  const user = await getUser(from.id);
  if (!user?.profile) {
    await ctx.reply(
      "You need a profile first. Tap *Create Profile* below.",
      {
        parse_mode: "Markdown",
        reply_markup: mainMenuKeyboard(false),
      }
    );
    return null;
  }
  return user;
}

function mainMenuKeyboard(hasProfile: boolean) {
  const kb = new InlineKeyboard();
  if (!hasProfile) {
    kb.text("Create Profile", "menu:create_profile").row();
  }
  kb.text("Make Free Call", "menu:free_call")
    .text("Make Pro Call", "menu:pro_call")
    .row()
    .text("Check Profile", "menu:profile")
    .text("Top Leaders", "menu:leaders")
    .row()
    .text("Top Channels", "menu:channels")
    .text("About Bot", "menu:about");
  return kb;
}

// ─── /start ─────────────────────────────────────────────────────

bot.command("start", async (ctx) => {
  const from = ctx.from;
  if (!from) return;

  let user = await getUser(from.id);
  if (!user) {
    user = await prisma.user.create({
      data: {
        telegramId: String(from.id),
        telegramUsername: from.username || null,
      },
      include: { profile: true },
    });
  }

  const hasProfile = !!user.profile;
  await ctx.reply(
    hasProfile
      ? `Welcome back to *Fomo Whales*!\n\nChoose an action:`
      : `Welcome to *Fomo Whales*!\n\nCreate a profile to start Free Calls and Pro Calls.`,
    {
      parse_mode: "Markdown",
      reply_markup: mainMenuKeyboard(hasProfile),
    }
  );
});

// ─── Menu callbacks ─────────────────────────────────────────────

bot.callbackQuery("menu:about", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(
    [
      "*About Fomo Whales*",
      "",
      "• *Free Calls* — Submit a token. When a verified 2× milestone is reached, we publish automatically.",
      "• *Pro Calls* — Choose a channel, pay, and your post is published after payment confirmation.",
      "• No wallet connection required.",
      "",
      "Website: " + config.appUrl,
      "Not financial advice. DYOR.",
    ].join("\n"),
    { parse_mode: "Markdown" }
  );
});

bot.callbackQuery("menu:create_profile", async (ctx) => {
  await ctx.answerCallbackQuery();
  const user = await getUser(ctx.from!.id);
  if (user?.profile) {
    await ctx.reply("You already have a profile. Use Check Profile to view it.");
    return;
  }
  ctx.session.step = "profile_name";
  ctx.session.draft = {};
  await ctx.reply("Enter your *display name* (2–64 characters):", {
    parse_mode: "Markdown",
  });
});

bot.callbackQuery("menu:profile", async (ctx) => {
  await ctx.answerCallbackQuery();
  const user = await requireProfile(ctx);
  if (!user?.profile) return;

  const [callCount, paidCount, milestoneCount] = await Promise.all([
    prisma.call.count({ where: { userId: user.id } }),
    prisma.promotion.count({
      where: { userId: user.id, type: "PAID_PRO", status: "PUBLISHED" },
    }),
    prisma.call.count({
      where: { userId: user.id, status: { in: ["MILESTONE_REACHED", "PUBLISHED"] } },
    }),
  ]);

  await ctx.reply(
    [
      `*${user.profile.displayName}* (@${user.profile.username})`,
      user.profile.bio || "_No bio_",
      "",
      `Total calls: ${callCount}`,
      `Verified milestones: ${milestoneCount}`,
      `Paid promotions: ${paidCount}`,
      `Joined: ${user.createdAt.toISOString().slice(0, 10)}`,
    ].join("\n"),
    { parse_mode: "Markdown" }
  );
});

bot.callbackQuery("menu:leaders", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(
    "Leaderboard is available on the website.\n" +
      `${config.appUrl}/leaders\n\n` +
      "Rankings use verified milestones only — not self-reported multipliers."
  );
});

bot.callbackQuery("menu:channels", async (ctx) => {
  await ctx.answerCallbackQuery();
  const channels = await prisma.channel.findMany({
    where: { enabled: true },
    include: { packages: { where: { enabled: true }, take: 1 } },
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }],
    take: 10,
  });

  if (!channels.length) {
    await ctx.reply("No channels available yet. Check back soon.");
    return;
  }

  const lines = channels.map((ch, i) => {
    const price = ch.packages[0]
      ? `$${(ch.packages[0].priceCents / 100).toFixed(0)}`
      : "—";
    return `${i + 1}. *${ch.name}* — from ${price}`;
  });

  await ctx.reply(
    ["*Top Channels*", "", ...lines, "", `Full catalog: ${config.appUrl}/channels`].join(
      "\n"
    ),
    { parse_mode: "Markdown" }
  );
});

bot.callbackQuery("menu:free_call", async (ctx) => {
  await ctx.answerCallbackQuery();
  const user = await requireProfile(ctx);
  if (!user) return;
  ctx.session.step = "free_chain";
  ctx.session.draft = {};
  await ctx.reply(
    "Make a *Free Call*.\n\nEnter the *chain* (e.g. solana, ethereum, base):",
    { parse_mode: "Markdown" }
  );
});

bot.callbackQuery("menu:pro_call", async (ctx) => {
  await ctx.answerCallbackQuery();
  const user = await requireProfile(ctx);
  if (!user) return;

  const channels = await prisma.channel.findMany({
    where: { enabled: true },
    include: { packages: { where: { enabled: true } } },
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }],
    take: 8,
  });

  if (!channels.length) {
    await ctx.reply("No channels available for Pro Calls yet.");
    return;
  }

  const kb = new InlineKeyboard();
  for (const ch of channels) {
    const minPrice = ch.packages[0]
      ? `$${(Math.min(...ch.packages.map((p) => p.priceCents)) / 100).toFixed(0)}`
      : "";
    kb.text(`${ch.name} ${minPrice}`, `pro_ch:${ch.id}`).row();
  }

  await ctx.reply("Select a channel for your *Pro Call*:", {
    parse_mode: "Markdown",
    reply_markup: kb,
  });
});

// ─── Text flow (profile + free call) ────────────────────────────

bot.on("message:text", async (ctx) => {
  const step = ctx.session.step;
  if (!step) return;

  const text = ctx.message.text.trim();
  const draft = ctx.session.draft || {};

  // Profile creation
  if (step === "profile_name") {
    draft.displayName = text;
    ctx.session.draft = draft;
    ctx.session.step = "profile_username";
    await ctx.reply("Enter a *username* (letters, numbers, underscore, 3–32 chars):", {
      parse_mode: "Markdown",
    });
    return;
  }

  if (step === "profile_username") {
    draft.username = text;
    ctx.session.draft = draft;
    ctx.session.step = "profile_bio";
    await ctx.reply("Enter a short *bio* (or type `skip`):", {
      parse_mode: "Markdown",
    });
    return;
  }

  if (step === "profile_bio") {
    const bio = text.toLowerCase() === "skip" ? undefined : text;
    const parsed = createProfileSchema.safeParse({
      displayName: draft.displayName,
      username: draft.username,
      bio,
    });
    if (!parsed.success) {
      await ctx.reply("Invalid data. Start again with Create Profile.");
      ctx.session.step = undefined;
      return;
    }

    const from = ctx.from!;
    let user = await getUser(from.id);
    if (!user) {
      user = await prisma.user.create({
        data: {
          telegramId: String(from.id),
          telegramUsername: from.username || null,
        },
        include: { profile: true },
      });
    }

    try {
      await prisma.userProfile.create({
        data: {
          userId: user.id,
          displayName: parsed.data.displayName,
          username: parsed.data.username.toLowerCase(),
          bio: parsed.data.bio,
        },
      });
      ctx.session.step = undefined;
      ctx.session.draft = {};
      await ctx.reply("✅ Profile created! You can now make Free Calls and Pro Calls.", {
        reply_markup: mainMenuKeyboard(true),
      });
    } catch {
      await ctx.reply("Username may already be taken. Try Create Profile again with a different username.");
      ctx.session.step = undefined;
    }
    return;
  }

  // Free call flow
  if (step === "free_chain") {
    draft.chain = text.toLowerCase();
    ctx.session.draft = draft;
    ctx.session.step = "free_address";
    await ctx.reply("Enter *token contract address* (or `skip` if not applicable):", {
      parse_mode: "Markdown",
    });
    return;
  }

  if (step === "free_address") {
    draft.tokenAddress = text.toLowerCase() === "skip" ? "" : text;
    ctx.session.draft = draft;
    ctx.session.step = "free_ticker";
    await ctx.reply("Enter *token ticker* (e.g. BONK):", { parse_mode: "Markdown" });
    return;
  }

  if (step === "free_ticker") {
    draft.tokenTicker = text.toUpperCase();
    ctx.session.draft = draft;
    ctx.session.step = "free_price";
    await ctx.reply(
      "Enter *reference entry price in USD* (number only, e.g. 0.00012).\nWe will also try to fetch live price for verification.",
      { parse_mode: "Markdown" }
    );
    return;
  }

  if (step === "free_price") {
    const price = parseFloat(text);
    if (!price || price <= 0) {
      await ctx.reply("Invalid price. Enter a positive number.");
      return;
    }
    draft.referencePrice = String(price);
    ctx.session.draft = draft;
    ctx.session.step = "free_text";
    await ctx.reply("Enter optional *promo text* (or `skip`):", {
      parse_mode: "Markdown",
    });
    return;
  }

  if (step === "free_text") {
    const promoText = text.toLowerCase() === "skip" ? undefined : text;
    const user = await requireProfile(ctx);
    if (!user) return;

    const refPrice = parseFloat(draft.referencePrice || "0");
    const parsed = freeCallSchema.safeParse({
      chain: draft.chain,
      tokenAddress: draft.tokenAddress || undefined,
      tokenTicker: draft.tokenTicker,
      referencePrice: refPrice,
      promoText,
    });

    if (!parsed.success) {
      await ctx.reply("Invalid call data. Start again with Make Free Call.");
      ctx.session.step = undefined;
      return;
    }

    // Optional live price for reference
    let priceSource = "user";
    let liquidityUsd: number | undefined;
    if (parsed.data.tokenAddress) {
      const live = await fetchTokenPrice(parsed.data.chain, parsed.data.tokenAddress);
      if (live?.reliable) {
        // Prefer live price as reference when reliable
        // Still store user intent; live used for monitoring
        priceSource = live.source;
        liquidityUsd = live.liquidityUsd;
      }
    }

    const call = await prisma.call.create({
      data: {
        userId: user.id,
        chain: parsed.data.chain,
        tokenAddress: parsed.data.tokenAddress,
        tokenTicker: parsed.data.tokenTicker,
        referencePrice: parsed.data.referencePrice,
        referenceTimestamp: new Date(),
        priceSource,
        liquidityUsd,
        currentPrice: parsed.data.referencePrice,
        highestPrice: parsed.data.referencePrice,
        promoText: parsed.data.promoText,
        status: "TRACKING",
      },
    });

    ctx.session.step = undefined;
    ctx.session.draft = {};
    await ctx.reply(
      [
        "✅ *Free Call submitted*",
        `ID: \`${call.id}\``,
        `Token: ${parsed.data.tokenTicker || "—"}`,
        `Chain: ${parsed.data.chain}`,
        `Reference: $${parsed.data.referencePrice}`,
        "",
        "We are tracking for a verified 2× milestone. Publication is automatic when confirmed.",
      ].join("\n"),
      { parse_mode: "Markdown" }
    );
    return;
  }
});

// Pro call channel selection → simplified package flow
bot.callbackQuery(/^pro_ch:(.+)$/, async (ctx) => {
  await ctx.answerCallbackQuery();
  const channelId = ctx.match![1];
  const user = await requireProfile(ctx);
  if (!user) return;

  const channel = await prisma.channel.findFirst({
    where: { id: channelId, enabled: true },
    include: { packages: { where: { enabled: true } } },
  });
  if (!channel || !channel.packages.length) {
    await ctx.reply("Channel not available.");
    return;
  }

  const pkg = channel.packages[0];
  // Create draft promotion + payment order
  const promotion = await prisma.promotion.create({
    data: {
      userId: user.id,
      channelId: channel.id,
      type: "PAID_PRO",
      status: "PENDING_PAYMENT",
      tokenName: "Pending",
      tokenTicker: "—",
      chain: "—",
      promoText: "Complete details via support or upcoming bot steps.",
    },
  });

  const order = await createPaymentOrder({
    userId: user.id,
    packageId: pkg.id,
    promotionId: promotion.id,
    amountCents: pkg.priceCents,
  });

  await ctx.reply(
    [
      `*Pro Call* — ${channel.name}`,
      `Package: ${pkg.name}`,
      `Price: $${(pkg.priceCents / 100).toFixed(2)} ${pkg.currency}`,
      "",
      `Order: \`${order.orderRef}\``,
      order.checkoutUrl
        ? `Pay here: ${order.checkoutUrl}`
        : "Payment checkout will be provided once the payment provider is configured.",
      "",
      "After payment is confirmed on the server, the post is published automatically.",
    ].join("\n"),
    { parse_mode: "Markdown" }
  );
});

bot.catch((err) => {
  console.error("[bot] error", err);
});

bot.start({
  onStart: (info) => console.log(`Bot @${info.username} started`),
});
