const TELEGRAM_BOT_URL = "https://t.me/FomoWhalesBot";

export function CallTypes() {
  return (
    <section className="border-t border-white/5 bg-white/[0.015] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-heading">Free Calls & Pro Calls</h2>
          <p className="section-sub mx-auto">
            Two ways to promote. Transparent rules. Automatic publishing when conditions are met.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="card-hover relative overflow-hidden p-8">
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-neon/5 blur-2xl" />
            <div className="relative">
              <span className="badge-neon">Free</span>
              <h3 className="mt-4 text-xl font-bold text-white">Free Call</h3>
              <p className="mt-2 text-sm text-white/50">
                Submit a token call through the bot. We track the reference price. When a verified
                2× milestone is reached under our verification rules, the call is published
                automatically to the free channel.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "No payment required",
                  "Reference price recorded at submission",
                  "Independent price verification with liquidity checks",
                  "Published only after confirmed 2× milestone",
                  "Visible on website promotions feed",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/65">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-neon" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card-hover relative overflow-hidden border-neon/20 p-8">
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-neon/10 blur-2xl" />
            <div className="relative">
              <span className="badge bg-neon text-whale-black">Pro</span>
              <h3 className="mt-4 text-xl font-bold text-white">Pro Call</h3>
              <p className="mt-2 text-sm text-white/50">
                Choose an approved Telegram channel, preview your promotional post, pay the listed
                package price, and the post is published automatically after payment confirmation.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Select from approved channel catalog",
                  "Transparent pricing per channel/package",
                  "Server-side payment verification",
                  "Automatic Telegram publication on success",
                  "Sponsored content clearly labeled",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/65">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-neon" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href={TELEGRAM_BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Open Bot to Create a Call
          </a>
        </div>
      </div>
    </section>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
