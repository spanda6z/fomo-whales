import Link from "next/link";

const FAQS = [
  {
    q: "Do I need a crypto wallet to use Fomo Whales?",
    a: "No. Profiles and calls are managed through the Telegram bot. No wallet connection is required.",
  },
  {
    q: "When is a Free Call published?",
    a: "A Free Call is published automatically only after a verified 2× milestone is confirmed against the recorded reference price using our price verification rules.",
  },
  {
    q: "How do Pro Calls get published?",
    a: "You select a channel, complete payment through the configured provider, and the backend confirms the payment before publishing the post to the chosen Telegram channel.",
  },
  {
    q: "Are promotions investment advice?",
    a: "No. All promotional content is for visibility only. Cryptocurrency carries significant risk. Always do your own research.",
  },
];

export function FAQPreview() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <p className="section-sub mx-auto">
            Quick answers. Full details on the FAQ page.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group card overflow-hidden transition-all open:border-neon/20"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-white marker:content-none [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="shrink-0 text-white/50 transition-transform group-open:rotate-180">
                  <ChevronIcon className="h-5 w-5" />
                </span>
              </summary>
              <div className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-white/50">
                {item.a}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/faq" className="btn-ghost text-neon hover:text-neon-dim">
            View all FAQs →
          </Link>
        </div>
      </div>
    </section>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
