const STEPS = [
  {
    step: "01",
    title: "Create Your Profile",
    description:
      "Open the Telegram bot and set up a public profile. No wallet connection required — just a display name, username, and optional bio.",
  },
  {
    step: "02",
    title: "Submit a Free Call or Pro Call",
    description:
      "Free Calls track a token until a verified 2× milestone. Pro Calls let you choose a channel and publish after payment confirmation.",
  },
  {
    step: "03",
    title: "Automatic Publication",
    description:
      "Verified milestone Free Calls and paid Pro Calls are published automatically to the designated Telegram channel. You receive the post link.",
  },
  {
    step: "04",
    title: "Visibility & Leaderboards",
    description:
      "Published promotions appear on the website. Callers can climb the leaderboard based on consistent, verified performance rules.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-heading">How Fomo Whales Works</h2>
          <p className="section-sub mx-auto">
            Simple flow from profile to published promotion — managed through Telegram, visible on the web.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item) => (
            <div
              key={item.step}
              className="card relative p-6 transition-all duration-300 hover:border-neon/20"
            >
              <span className="text-3xl font-bold text-neon/30">{item.step}</span>
              <h3 className="mt-3 text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
