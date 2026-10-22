import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Fomo Whales, Free Calls, Pro Calls, payments, and platform usage.",
};

const FAQ_SECTIONS = [
  {
    title: "Getting Started",
    items: [
      {
        q: "Do I need a crypto wallet?",
        a: "No. Fomo Whales does not require wallet connection. Profiles and calls are managed through the Telegram bot using your Telegram identity.",
      },
      {
        q: "How do I create a profile?",
        a: "Open the Telegram bot and choose Create Profile. Provide a display name, username (if not already available from Telegram), optional bio, and optional avatar. One profile per Telegram identity.",
      },
      {
        q: "Can I edit my profile later?",
        a: "Yes. Profile editing is available from the bot menu after your profile exists.",
      },
    ],
  },
  {
    title: "Free Calls",
    items: [
      {
        q: "What is a Free Call?",
        a: "A Free Call lets you submit token details and a reference price. The platform monitors the token. When a verified 2× price milestone is confirmed, the call is published automatically to the free channel.",
      },
      {
        q: "When is a 2× milestone considered verified?",
        a: "Only when our price-checking service confirms the price is at least twice the recorded reference price, subject to liquidity and data-quality checks. Suspicious spikes may be rejected. We do not claim verification when sources are unreliable.",
      },
      {
        q: "Is Free Call publication instant?",
        a: "No. Detection depends on the price provider's update frequency and our monitoring schedule. We do not promise real-time detection.",
      },
    ],
  },
  {
    title: "Pro Calls & Payments",
    items: [
      {
        q: "How does a Pro Call work?",
        a: "Select an approved channel, enter promotion details, review the preview and price, complete payment, and wait for server-side confirmation. The post is then published automatically to the selected channel.",
      },
      {
        q: "How is payment confirmed?",
        a: "Only the backend confirms payment using trusted provider webhooks and verification. Client-side redirects or messages are never treated as proof of payment.",
      },
      {
        q: "What if payment succeeds but the Telegram post fails?",
        a: "The system retries safely. If the problem persists, administrators are alerted. Duplicate posts are prevented via idempotent jobs.",
      },
    ],
  },
  {
    title: "Platform & Risk",
    items: [
      {
        q: "Is promotional content financial advice?",
        a: "No. All promotions are for visibility only. Cryptocurrency involves substantial risk of loss. Always do your own research.",
      },
      {
        q: "How are channels selected?",
        a: "Only channels approved by administrators appear. The bot must have posting permissions. Metrics are shown only when verified data is available.",
      },
      {
        q: "Can I cancel or get a refund?",
        a: "Refund and cancellation policies are defined in the Terms of Service and depend on the payment provider and publication status. Contact support for specific cases.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Frequently Asked Questions
      </h1>
      <p className="mt-3 text-base text-white/50">
        Answers about profiles, Free Calls, Pro Calls, payments, and platform rules.
      </p>

      <div className="mt-12 space-y-12">
        {FAQ_SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-lg font-semibold text-neon">{section.title}</h2>
            <div className="mt-4 space-y-3">
              {section.items.map((item) => (
                <details
                  key={item.q}
                  className="group card overflow-hidden open:border-neon/20"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-white [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span className="shrink-0 text-white/50 transition-transform group-open:rotate-180">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-white/50">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
