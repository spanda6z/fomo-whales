import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Top Channels",
  description:
    "Browse curated Telegram channels available for token promotions on Fomo Whales. Transparent pricing and package details.",
};

export default function ChannelsPage() {
  // Empty until admin adds channels — never fabricate audience or engagement
  const channels: never[] = [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Top Promotion Channels
        </h1>
        <p className="mt-3 text-base text-white/50">
          Search and filter approved Telegram channels. Each listing shows available packages and
          pricing once channels are onboarded by administrators.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search channels..."
          className="input-field max-w-xs"
          disabled
          aria-label="Search channels"
        />
        <select className="input-field max-w-[160px]" disabled aria-label="Sort by">
          <option>Sort by</option>
        </select>
      </div>

      {channels.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-6 py-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.06]">
            <svg
              className="h-8 w-8 text-white/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>
          </div>
          <h2 className="mt-5 text-xl font-semibold text-white">No channels listed yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/50">
            Administrators are onboarding promotion channels. Once approved, they will appear here
            with verified audience data, engagement metrics, and package pricing where available.
          </p>
          <a
            href="https://t.me/FomoWhalesBot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8 inline-flex"
          >
            Open Telegram Bot
          </a>
        </div>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Channel cards rendered from real data */}
        </div>
      )}
    </div>
  );
}
