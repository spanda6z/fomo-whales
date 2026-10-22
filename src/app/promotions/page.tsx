import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Promotions",
  description:
    "Public feed of published Free Calls and Pro Calls on Fomo Whales. Sponsored content is clearly labeled.",
};

export default function PromotionsPage() {
  const promotions: never[] = [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Promotions Feed
        </h1>
        <p className="mt-3 text-base text-white/50">
          Published Free Calls (verified 2× milestones) and paid Pro Calls. Sponsored posts are
          labeled transparently.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search by token, caller, channel..."
          className="input-field max-w-sm"
          disabled
          aria-label="Search promotions"
        />
        <select className="input-field max-w-[160px]" disabled aria-label="Filter type">
          <option>All types</option>
          <option>Free Calls</option>
          <option>Pro Calls</option>
        </select>
      </div>

      {promotions.length === 0 ? (
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
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
          <h2 className="mt-5 text-xl font-semibold text-white">No published promotions yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/50">
            Free Calls appear after a verified 2× milestone. Pro Calls appear after confirmed
            payment and successful Telegram publication. All sponsored content is labeled.
          </p>
        </div>
      ) : (
        <div className="mt-10 space-y-4">
          {/* Promotion cards from real data */}
        </div>
      )}
    </div>
  );
}
