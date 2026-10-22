"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/channels", label: "Channels" },
  { href: "/promotions", label: "Promotions" },
  { href: "/leaders", label: "Leaders" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

const TELEGRAM_BOT_URL = "https://t.me/FomoWhalesBot";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <Image
            src="/logo-fomo-whales.png"
            alt="Fomo Whales"
            width={40}
            height={40}
            className="h-9 w-9 object-contain"
            priority
          />
          <span className="hidden text-lg font-bold tracking-tight sm:inline">
            <span className="text-white">FOMO</span>
            <span className="ml-1 text-neon">WHALES</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={TELEGRAM_BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-all hover:border-neon/40 hover:bg-neon/10 hover:text-neon"
          >
            Launch Bot
          </a>
          <Link
            href="/channels"
            className="inline-flex items-center gap-2 rounded-full bg-neon px-4 py-2 text-xs font-semibold text-black transition-all hover:bg-neon-dim hover:shadow-[0_0_20px_rgba(0,255,157,0.35)]"
          >
            Explore Channels
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white/70 hover:bg-white/5 hover:text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <CloseIcon className="h-5 w-5" />
          ) : (
            <MenuIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/5 bg-black/95 md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-white/5 pt-3">
              <a
                href={TELEGRAM_BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white"
              >
                Launch Telegram Bot
              </a>
              <Link
                href="/channels"
                onClick={() => setMobileOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-full bg-neon px-4 py-2.5 text-sm font-semibold text-black"
              >
                Explore Channels
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
