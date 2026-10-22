/**
 * Auditable price-checking service.
 * Supports configurable providers. Never treat user-supplied prices as proof.
 */

import { config } from "./config";

export interface PriceResult {
  price: number;
  source: string;
  liquidityUsd?: number;
  timestamp: Date;
  reliable: boolean;
  raw?: unknown;
}

export async function fetchTokenPrice(
  chain: string,
  tokenAddress?: string
): Promise<PriceResult | null> {
  if (!tokenAddress) {
    return null;
  }

  const provider = config.price.provider;

  try {
    if (provider === "dexscreener" || provider === "placeholder") {
      return await fetchFromDexScreener(chain, tokenAddress);
    }
    // Add more providers as needed
    return await fetchFromDexScreener(chain, tokenAddress);
  } catch (err) {
    console.error("[price] fetch failed", { chain, tokenAddress, err });
    return null;
  }
}

async function fetchFromDexScreener(
  chain: string,
  tokenAddress: string
): Promise<PriceResult | null> {
  const chainMap: Record<string, string> = {
    solana: "solana",
    ethereum: "ethereum",
    eth: "ethereum",
    bsc: "bsc",
    base: "base",
  };
  const dsChain = chainMap[chain.toLowerCase()] || chain.toLowerCase();

  const url = `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 30 },
  });

  if (!res.ok) return null;

  const data = (await res.json()) as {
    pairs?: Array<{
      chainId: string;
      priceUsd?: string;
      liquidity?: { usd?: number };
      volume?: { h24?: number };
    }>;
  };

  const pairs = (data.pairs || []).filter(
    (p) => p.chainId?.toLowerCase() === dsChain || !dsChain
  );

  if (!pairs.length) return null;

  // Prefer highest liquidity pair
  pairs.sort((a, b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0));
  const best = pairs[0];
  const price = parseFloat(best.priceUsd || "0");
  const liquidityUsd = best.liquidity?.usd;

  if (!price || price <= 0) return null;

  // Basic reliability: require some liquidity
  const reliable = (liquidityUsd || 0) >= 1000;

  return {
    price,
    source: "dexscreener",
    liquidityUsd,
    timestamp: new Date(),
    reliable,
    raw: best,
  };
}

/**
 * Check whether verified price is at least `multiplier` × reference.
 */
export function isMilestoneReached(
  referencePrice: number,
  currentPrice: number,
  multiplier = config.milestoneMultiplier
): boolean {
  if (referencePrice <= 0 || currentPrice <= 0) return false;
  return currentPrice >= referencePrice * multiplier;
}
