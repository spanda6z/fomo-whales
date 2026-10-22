# Fomo Whales

Premium crypto promotion platform + Telegram bot.

**Get your token promoted on curated Telegram channels.**  
Free Calls (verified 2× milestones) · Pro Calls (paid, auto-published)

🌐 **Repo:** https://github.com/spanda6z/fomo-whales

---

## Status

| Phase | Description | Status |
|-------|-------------|--------|
| **1** | Branding, public website, navigation, responsive layouts | ✅ |
| **2** | PostgreSQL schema, backend API, user profiles, Telegram bot menus | ✅ |
| **3** | Free-call submission, price monitoring, 2× milestone engine | ✅ |
| **4** | Channel catalog, Pro Call checkout, payment verification, auto-publication | ✅ |
| **5** | Admin dashboard shell, moderation structure, settings | ✅ |
| **6** | Docs, tests, env example, production readiness notes | ✅ |

---

## Quick start

```bash
npm install
cp .env.example .env.local
# Edit .env.local with DATABASE_URL, REDIS_URL, TELEGRAM_BOT_TOKEN, etc.

npx prisma generate
npx prisma db push

npm run dev          # website → http://localhost:3000
npm run bot:dev      # Telegram bot
npm run worker:dev   # price monitor + publication workers
```

Full setup: [docs/SETUP.md](docs/SETUP.md) · Architecture: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

---

## Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS  
- **Database:** PostgreSQL + Prisma  
- **Bot:** grammY (Telegram Bot API)  
- **Jobs:** Redis + BullMQ  
- **Payments:** Provider-independent (webhook-verified)  
- **Prices:** DexScreener (configurable)

---

## Features

### Website
- Landing with brand hero (whale banner + logo)
- Channels directory, promotions feed, leaders, about, FAQ, legal pages
- Empty states only — no fabricated statistics

### Telegram bot
- Profile creation (required before calls)
- Free Call flow → tracking until verified 2×
- Pro Call → channel selection → payment order
- Profile stats, channels list, about

### Backend
- Shared Prisma schema (users, channels, calls, milestones, promotions, payments, publications, admin, audit)
- Idempotent payment confirmation + publication keys
- Price worker with liquidity checks
- Publication worker with retries

### Admin
- Dashboard shell at `/admin` (wire server-side auth before production)

---

## Environment

See `.env.example`. Never commit real secrets.

---

## License

Proprietary — All rights reserved.
