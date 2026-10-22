/**
 * Server-side configuration. Never expose secrets to the client.
 */
export const config = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  telegramBotUrl: process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL || "https://t.me/FomoWhalesBot",
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || "",
  telegramFreeChannelId: process.env.TELEGRAM_FREE_CHANNEL_ID || "",
  telegramWebhookSecret: process.env.TELEGRAM_WEBHOOK_SECRET || "",
  databaseUrl: process.env.DATABASE_URL || "",
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
  payment: {
    provider: process.env.PAYMENT_PROVIDER || "placeholder",
    secretKey: process.env.PAYMENT_SECRET_KEY || "",
    webhookSecret: process.env.PAYMENT_WEBHOOK_SECRET || "",
    currency: process.env.PAYMENT_CURRENCY || "USD",
  },
  price: {
    provider: process.env.PRICE_PROVIDER || "dexscreener",
    apiKey: process.env.PRICE_API_KEY || "",
  },
  adminSecret: process.env.ADMIN_SECRET || "",
  milestoneMultiplier: 2,
  freeCallMaxAgeDays: 30,
} as const;
