import Link from "next/link";

/**
 * Featured channels section.
 * Shows empty state until real channels are added via admin.
 * Never fabricate subscriber counts or engagement metrics.
 */
export function FeaturedChannels() {
  // Empty until admin adds channels — no demo data with fake metrics
  const channels: never[] = [];

  return (
    <section className="border-t border-white/5 bg-white/[0.02] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="section-heading">Featured Channels</h2>
            <p className="section-sub">
              Curated Telegram channels available for token promotions.
            </p>
          </div>
          <Link href="/channels" className="btn-ghost text-neon hover:text-neon-dim">
            View all channels →
          </Link>
        </div>

        {channels.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.06]">
              <ChannelIcon className="h-7 w-7 text-white/50" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">Channels coming soon</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-white/50">
              Promotion channels are being onboarded. Check back shortly or open the Telegram bot
              to get notified when channels go live.
            </p>
            <Link href="/channels" className="btn-secondary mt-6 inline-flex">
              Browse Channel Directory
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Channel cards will render here when data exists */}
          </div>
        )}
      </div>
    </section>
  );
}

function ChannelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
      />
    </svg>
  );
}
