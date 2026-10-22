import { z } from "zod";

export const createProfileSchema = z.object({
  displayName: z.string().min(2).max(64),
  username: z.string().min(3).max(32).regex(/^[a-zA-Z0-9_]+$/),
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url().optional().nullable(),
});

export const freeCallSchema = z.object({
  chain: z.string().min(1).max(32),
  tokenAddress: z.string().min(1).max(128).optional(),
  tokenName: z.string().max(64).optional(),
  tokenTicker: z.string().max(16).optional(),
  referencePrice: z.number().positive(),
  promoText: z.string().max(2000).optional(),
});

export const proCallSchema = z.object({
  channelId: z.string().cuid(),
  packageId: z.string().cuid(),
  tokenName: z.string().min(1).max(64),
  tokenTicker: z.string().min(1).max(16),
  chain: z.string().min(1).max(32),
  contractAddress: z.string().max(128).optional(),
  promoText: z.string().min(10).max(2000),
  tokenLogoUrl: z.string().url().optional(),
});

export type CreateProfileInput = z.infer<typeof createProfileSchema>;
export type FreeCallInput = z.infer<typeof freeCallSchema>;
export type ProCallInput = z.infer<typeof proCallSchema>;
