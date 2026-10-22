import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Leaders",
  description:
    "Leaderboard of Fomo Whales callers ranked by consistent, verified performance rules.",
};

export default function LeadersPage() {
  const leaders: never[] = [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Top Leaders
        </h1>
        <p className="mt-3 text-base text-white/50">
          Callers ranked using documented, consistent rules based on verified milestones and
          published calls — not self-reported multipliers.
        </p>
      </div>

      {leaders.length === 0 ? (
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
                d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-4.5A3.375 3.375 0 0012.75 9.75h-1.5A3.375 3.375 0 007.5 14.25v4.5m9-13.5h-9"
              />
            </svg>
          </div>
          <h2 className="mt-5 text-xl font-semibold text-white">Leaderboard not yet active</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/50">
            Rankings will populate as verified Free Call milestones and Pro Calls are published.
            Ranking methodology will be documented publicly.
          </p>
        </div>
      ) : (
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
          {/* Ranked table from real data */}
        </div>
      )}
    </div>
  );
}
