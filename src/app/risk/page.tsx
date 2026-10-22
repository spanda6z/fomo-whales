import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Risk Disclosure",
  description: "Important risk disclosures regarding cryptocurrency and promotional content on Fomo Whales.",
};

export default function RiskPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Risk Disclosure
      </h1>
      <p className="mt-2 text-sm text-white/50">Please read carefully before using the platform.</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-white/50">
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 text-amber-200/90">
          <p className="font-medium text-amber-200">
            Cryptocurrency tokens involve a high risk of loss and can result in the loss of your
            entire investment. Past performance is not indicative of future results.
          </p>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-white">No Investment Advice</h2>
          <p className="mt-2">
            Content on Fomo Whales, including Free Calls, Pro Calls, leaderboards, and channel
            listings, is promotional or informational only. Nothing constitutes investment, legal,
            tax, or financial advice. You are solely responsible for your decisions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Token and Market Risks</h2>
          <p className="mt-2">
            Token prices are volatile. Liquidity can disappear. Smart contracts may have
            vulnerabilities. Projects may fail, be abandoned, or involve fraud. Milestone
            verification relies on third-party price data that can be delayed, incomplete, or
            manipulated.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Promotional Content</h2>
          <p className="mt-2">
            Callers and projects submit promotional material. We do not independently audit every
            token or claim. Sponsored (paid) content is labeled but still carries the same market
            risks. Do not rely on promotional posts as the sole basis for any transaction.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Platform Limitations</h2>
          <p className="mt-2">
            We do not guarantee that Free Call milestones will be detected or published, that
            payments will always complete, or that Telegram publication will succeed in every case.
            Service interruptions, provider outages, and technical errors can occur.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">Your Responsibility</h2>
          <p className="mt-2">
            Always conduct your own research (DYOR). Verify contract addresses, liquidity, team
            information, and tokenomics independently. Never invest more than you can afford to
            lose. If you are unsure, consult a qualified professional.
          </p>
        </section>
      </div>
    </div>
  );
}
