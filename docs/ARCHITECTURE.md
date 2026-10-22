# Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Next.js Web    │────▶│  PostgreSQL      │◀────│  Telegram Bot   │
│  (public + API) │     │  (shared state)  │     │  (grammY)       │
└────────┬────────┘     └────────▲─────────┘     └────────┬────────┘
         │                       │                        │
         │              ┌────────┴─────────┐              │
         └─────────────▶│  Redis + BullMQ  │◀─────────────┘
                        │  - price monitor │
                        │  - publish jobs  │
                        └──────────────────┘
```

## Free Call flow

1. User submits via bot → Call status TRACKING
2. Worker polls price provider every ~60s
3. On verified 2× → CallMilestone + status MILESTONE_REACHED
4. Publication job → Telegram free channel
5. Status PUBLISHED; appears on website promotions feed

## Pro Call flow

1. User selects channel + package in bot
2. PaymentOrder created (server-side)
3. User pays via provider checkout
4. Webhook → confirmPayment (signature verified, idempotent)
5. TelegramPublication QUEUED → worker publishes
6. Status PUBLISHED on promotion

## Idempotency

- Payment events keyed by providerEventId
- Publications keyed by idempotencyKey
- Duplicate webhooks / retries never create duplicate posts
