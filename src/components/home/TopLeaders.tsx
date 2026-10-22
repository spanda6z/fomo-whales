import Link from "next/link";

/**
 * Top callers / leaders preview.
 * Empty until real ranked data exists. Leaderboard uses documented rules only.
 */
export function TopLeaders() {
  const leaders: never[] = [];

  return (
    <section className="border-t border-white/5 bg-white/[0.015] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="section-heading">Top Leaders</h2>
            <p className="section-sub">
              Callers ranked by consistent, verified performance — not self-reported multipliers.
            </p>
          </div>
          <Link href="/leaders" className="btn-ghost text-neon hover:text-neon-dim">
            Full leaderboard →
          </Link>
        </div>

        {leaders.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.06]">
              <TrophyIcon className="h-7 w-7 text-white/50" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">Leaderboard launching soon</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-white/50">
              Rankings will appear once verified calls and milestones are recorded. Rules are
              documented and applied consistently.
            </p>
            <Link href="/leaders" className="btn-secondary mt-6 inline-flex">
              View Leaderboard
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {/* Leader cards when data exists */}
          </div>
        )}
      </div>
    </section>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-4.5A3.375 3.375 0 0012.75 9.75h-1.5A3.375 3.375 0 007.5 14.25v4.5m9-13.5h-9"
      />
    </svg>
  );
}
