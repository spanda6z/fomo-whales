# Fomo Whales — Setup Guide

## Prerequisites

- Node.js 20+
- PostgreSQL 15+
- Redis 7+
- Telegram Bot token (from @BotFather)

## 1. Install

```bash
npm install
cp .env.example .env.local
```

## 2. Environment

Fill `.env.local`:

```
DATABASE_URL=postgresql://user:pass@localhost:5432/fomo_whales
REDIS_URL=redis://localhost:6379
TELEGRAM_BOT_TOKEN=...
TELEGRAM_FREE_CHANNEL_ID=...   # numeric chat id where free calls post
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_TELEGRAM_BOT_URL=https://t.me/YourBotUsername
```

Optional (Phase 4):

```
PAYMENT_PROVIDER=stripe
PAYMENT_SECRET_KEY=
PAYMENT_WEBHOOK_SECRET=
PAYMENT_CURRENCY=USD
PRICE_PROVIDER=dexscreener
ADMIN_SECRET=
```

## 3. Database

```bash
npx prisma generate
npx prisma db push
```

## 4. Run

```bash
npm run dev          # website
npm run bot:dev      # Telegram bot
npm run worker:dev   # workers
```

## 5. Telegram bot setup

1. Create bot with @BotFather → copy token
2. Add bot as admin to free-call channel with Post Messages permission
3. Get channel chat ID → TELEGRAM_FREE_CHANNEL_ID
4. For paid channels: bot must be admin with post rights

## 6. Payment provider

Provider-independent layer. Webhook at `/api/webhooks/payment` verifies signature.
Never trust client redirects as payment proof.

## Security checklist

- [ ] Secrets never in client bundles
- [ ] Admin routes protected server-side
- [ ] Payment webhooks signature-verified
- [ ] Rate limiting on bot and APIs
- [ ] Database backups enabled
