import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Fomo Whales platform and Telegram bot.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-white/50">Last updated: October 2026</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-white/50">
        <section>
          <h2 className="text-lg font-semibold text-white">1. Acceptance</h2>
          <p className="mt-2">
            By accessing the Fomo Whales website or using the Telegram bot, you agree to these
            Terms. If you do not agree, do not use the platform.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">2. Service Description</h2>
          <p className="mt-2">
            Fomo Whales provides a platform for promoting crypto tokens via selected Telegram
            channels through Free Calls (milestone-triggered) and Pro Calls (paid). The website is
            for discovery and visibility. Call creation occurs via the Telegram bot. We do not
            provide financial advice, custody services, or token issuance.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">3. Profiles and Accounts</h2>
          <p className="mt-2">
            Profiles are tied to Telegram user identity. One profile per Telegram account. You are
            responsible for the accuracy of information you submit. We may suspend accounts for
            abuse, spam, or violation of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">4. Free Calls</h2>
          <p className="mt-2">
            Free Calls are published only after verified 2× milestones under our rules. Publication
            is not guaranteed if price data is unreliable or checks fail. We may reject or delay
            publication for data quality or abuse reasons.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">5. Pro Calls and Payments</h2>
          <p className="mt-2">
            Pro Call prices are shown before payment. Payment is confirmed server-side only.
            Successful confirmation triggers automated publication attempts. Refund eligibility
            depends on publication status and provider rules; contact support for disputes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">6. Sponsored Content</h2>
          <p className="mt-2">
            Paid promotions are labeled as sponsored. You are responsible for the accuracy and
            legality of promotional text and token claims you submit.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">7. Acceptable Use</h2>
          <p className="mt-2">
            You may not use the platform for fraud, market manipulation, impersonation, spam,
            illegal content, or to promote tokens in ways that violate applicable law. We reserve
            the right to moderate and remove content and suspend users.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">8. Disclaimers</h2>
          <p className="mt-2">
            The platform is provided "as is." We do not guarantee uninterrupted service, accurate
            price data, or successful publication in all cases. Cryptocurrency is highly risky.
            Nothing on the platform constitutes investment, legal, or tax advice.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">9. Limitation of Liability</h2>
          <p className="mt-2">
            To the fullest extent permitted by law, Fomo Whales and its operators are not liable
            for indirect, incidental, or consequential damages arising from use of the platform,
            including losses related to token prices or failed promotions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">10. Changes</h2>
          <p className="mt-2">
            We may update these Terms. Continued use after changes constitutes acceptance. Material
            changes will be indicated by updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">11. Contact</h2>
          <p className="mt-2">
            For terms-related questions: support@fomowhales.com
          </p>
        </section>
      </div>
    </div>
  );
}
