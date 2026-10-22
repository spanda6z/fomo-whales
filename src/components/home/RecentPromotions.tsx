import Link from "next/link";

/**
 * Recent promotions feed.
 * Empty state only — never show fabricated promotions, tokens, or returns.
 */
export function RecentPromotions() {
  const promotions: never[] = [];

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="section-heading">Recent Promotions</h2>
            <p className="section-sub">
              Latest published Free Calls and Pro Calls across our channels.
            </p>
          </div>
          <Link href="/promotions" className="btn-ghost text-neon hover:text-neon-dim">
            View all promotions →
          </Link>
        </div>

        {promotions.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.06]">
              <FeedIcon className="h-7 w-7 text-white/50" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">No promotions yet</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-white/50">
              Published Free Calls and paid Pro Calls will appear here. Sponsored content is always
              labeled clearly.
            </p>
            <Link href="/promotions" className="btn-secondary mt-6 inline-flex">
              Open Promotions Feed
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Promotion cards when data exists */}
          </div>
        )}
      </div>
    </section>
  );
}

function FeedIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  );
}
