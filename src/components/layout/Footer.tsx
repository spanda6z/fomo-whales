import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = {
  platform: [
    { href: "/channels", label: "Top Channels" },
    { href: "/promotions", label: "Promotions" },
    { href: "/leaders", label: "Top Leaders" },
    { href: "/about", label: "About" },
  ],
  resources: [
    { href: "/faq", label: "FAQ" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/risk", label: "Risk Disclosure" },
  ],
};

const TELEGRAM_BOT_URL = "https://t.me/FomoWhalesBot";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/logo-fomo-whales.png"
                alt="Fomo Whales"
                width={36}
                height={36}
                className="h-8 w-8 object-contain"
              />
              <span className="text-base font-bold tracking-tight">
                <span className="text-white">FOMO</span>
                <span className="ml-1 text-neon">WHALES</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-white/50">
              Premium token promotion on curated Telegram channels. Free milestone calls and paid Pro Calls.
            </p>
            <a
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-neon hover:text-[#00e68a]"
            >
              Open Telegram Bot →
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Platform
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/45 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Resources
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/45 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              Support
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={TELEGRAM_BOT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/45 transition-colors hover:text-white"
                >
                  Telegram Bot
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@fomowhales.com"
                  className="text-sm text-white/45 transition-colors hover:text-white"
                >
                  support@fomowhales.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Fomo Whales. All rights reserved.
          </p>
          <p className="max-w-md text-center text-xs text-white/40 sm:text-right">
            Cryptocurrency involves significant risk. Promotional content is not financial advice.
            Always do your own research.
          </p>
        </div>
      </div>
    </footer>
  );
}
