import type { Metadata } from "next";

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
          Curated Telegram channels for token promotions. Pricing is set per package. Audience and
          engagement figures are shown only when verified.
        </p>
      </div>

      {channels.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-8 py-16 text-center">
          <p className="text-lg font-medium text-white/70">No channels listed yet</p>
          <p className="mt-2 text-sm text-white/40">
            Channels will appear here once they are added and enabled by the platform team.
          </p>
        </div>
      ) : null}
    </div>
  );
}
