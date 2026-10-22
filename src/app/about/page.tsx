import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "What Fomo Whales is, how the Telegram bot works, how channels are selected, and how payments and publication work.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">About Fomo Whales</h1>
      <p className="mt-4 text-lg text-white/65">
        Fomo Whales is a crypto promotion platform that helps projects reach audiences on curated
        Telegram channels through Free Calls and paid Pro Calls.
      </p>

      <div className="prose-invert mt-12 space-y-10 text-sm leading-relaxed text-white/50">
        <section>
          <h2 className="text-xl font-semibold text-white">What we do</h2>
          <p className="mt-3">
            The website is the public hub for discovery: featured channels, published promotions,
            caller profiles, and leaderboards. Users create and manage calls exclusively through the
            Telegram bot. We do not require wallet connections and we do not operate as a token
            launchpad or trading terminal.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">How the Telegram bot works</h2>
          <p className="mt-3">
            Users must create a profile before accessing call features. The bot offers Free Calls
            and Pro Calls, profile viewing, leaderboards, channel browsing, and platform
            information. All state is shared with the website backend.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Free Calls</h2>
          <p className="mt-3">
            A Free Call records a reference price and tracks the token. When a verified 2×
            milestone is confirmed under our verification rules (reliable price sources, liquidity
            and data-quality checks), the call is published automatically to the designated free
            channel. We do not present a milestone as verified when the price source cannot
            establish it reliably.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Pro Calls & payments</h2>
          <p className="mt-3">
            Users select an approved channel, review pricing and a post preview, and complete
            payment. Only the backend marks payment as confirmed based on trusted provider
            verification. After confirmation, the promotional post is published automatically to
            the selected Telegram channel. Idempotent processing prevents duplicate posts.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Channel selection</h2>
          <p className="mt-3">
            Only administrator-approved channels appear in the catalog. The bot must have posting
            permissions in every managed destination. Audience and engagement metrics are shown
            only when verified data exists.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Risks</h2>
          <p className="mt-3">
            Cryptocurrency tokens carry significant risk of loss. Promotional content is not
            financial advice and does not guarantee returns. Read our{" "}
            <Link href="/risk" className="link-neon">
              Risk Disclosure
            </Link>{" "}
            and always do your own research.
          </p>
        </section>
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <a
          href="https://t.me/FomoWhalesBot"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Launch Telegram Bot
        </a>
        <Link href="/channels" className="btn-secondary">
          Explore Channels
        </Link>
      </div>
    </div>
  );
}
