import Link from "next/link";
import Image from "next/image";

const TELEGRAM_BOT_URL = "https://t.me/FomoWhalesBot";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/bg-whale.png"
          alt=""
          fill
          className="object-cover object-center opacity-60"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </div>

      <div className="pointer-events-none absolute -right-20 top-1/4 h-[500px] w-[500px] rounded-full bg-neon/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-96 rounded-full bg-neon/5 blur-[80px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:flex-row lg:items-center lg:gap-8 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="flex-1 text-center lg:text-left">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neon/80">
            Promote &nbsp;/&nbsp; Grow &nbsp;/&nbsp; Get Seen
          </p>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
            Get Your Token{" "}
            <span className="text-neon">Promoted</span> on Our Top{" "}
            <span className="text-white">Telegram Channels</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65 lg:mx-0 sm:text-lg">
            Reach crypto communities, increase visibility, and put your project in front of the
            right audience with streamlined token promotions.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/channels"
              className="inline-flex min-w-[200px] items-center justify-center gap-2 rounded-full bg-neon px-6 py-3.5 text-sm font-bold text-black transition-all hover:bg-[#00e68a] hover:shadow-[0_0_28px_rgba(0,255,157,0.4)] active:scale-[0.98]"
            >
              Explore Promotion Channels
              <span aria-hidden>→</span>
            </Link>
            <a
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[200px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-neon/40 hover:bg-neon/10 hover:text-neon active:scale-[0.98]"
            >
              <TelegramIcon className="h-4 w-4" />
              Launch Telegram Bot
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {[
              { icon: <MegaphoneIcon />, label: "Top Channels", sub: "Reach real communities" },
              { icon: <BoltIcon />, label: "Instant Posting", sub: "Automated & reliable" },
              { icon: <ShieldIcon />, label: "Transparent Pricing", sub: "No hidden fees" },
              { icon: <UsersIcon />, label: "Trusted by Projects", sub: "Build your presence" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1.5 text-center lg:items-start lg:text-left">
                <div className="flex h-8 w-8 items-center justify-center text-neon">{item.icon}</div>
                <p className="text-xs font-semibold text-white">{item.label}</p>
                <p className="text-[11px] text-white/45">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex flex-1 items-center justify-center lg:justify-end">
          <div className="relative h-[320px] w-full max-w-[520px] sm:h-[400px] lg:h-[480px]">
            <Image
              src="/hero-banner.png"
              alt="Fomo Whales — glowing whale with crypto tokens"
              fill
              className="object-contain object-center drop-shadow-[0_0_40px_rgba(0,255,157,0.25)]"
              priority
              quality={95}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function MegaphoneIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18v-9.18m0 9.18a7.5 7.5 0 008.82 7.23 7.5 7.5 0 00-8.82-7.23z" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}
