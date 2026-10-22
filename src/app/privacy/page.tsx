import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Fomo Whales — how we handle user data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-white/50">Last updated: October 2026</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-white/50">
        <section>
          <h2 className="text-lg font-semibold text-white">1. Data We Collect</h2>
          <p className="mt-2">
            When you use the Telegram bot we receive your Telegram user ID, username (if set), and
            the profile data you choose to provide (display name, bio, optional avatar). We store
            call submissions, payment order metadata, publication records, and related timestamps.
            The website may collect standard technical logs (IP, user agent) for security and
            operations.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">2. How We Use Data</h2>
          <p className="mt-2">
            Data is used to operate the platform: profiles, call tracking, milestone verification,
            payment processing, Telegram publication, leaderboards, abuse prevention, and support.
            Public profile fields and published promotions are visible on the website.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">3. What We Do Not Collect</h2>
          <p className="mt-2">
            We do not require or collect private keys, seed phrases, or wallet credentials. We do
            not request government ID for standard platform use.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">4. Sharing</h2>
          <p className="mt-2">
            We share data with service providers necessary to operate the platform (hosting,
            database, payment providers, Telegram API) under appropriate agreements. We do not sell
            personal data. We may disclose information if required by law or to protect rights and
            safety.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">5. Retention</h2>
          <p className="mt-2">
            We retain account and transaction records as needed for operations, audits, and legal
            obligations. You may request account-related information or deletion subject to
            retention requirements and ongoing disputes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">6. Security</h2>
          <p className="mt-2">
            We implement server-side access controls, validation, and secrets management. No method
            of transmission or storage is fully secure; use the platform accordingly.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-white">7. Contact</h2>
          <p className="mt-2">
            Privacy questions: support@fomowhales.com
          </p>
        </section>
      </div>
    </div>
  );
}
