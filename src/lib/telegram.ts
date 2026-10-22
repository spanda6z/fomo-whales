/**
 * Telegram Bot API helpers for publication.
 * Bot must have posting permissions in destination channels.
 */

import { config } from "./config";

export async function sendChannelMessage(
  chatId: string,
  text: string,
  options?: { parseMode?: "HTML" | "Markdown" }
): Promise<{ messageId: string; postUrl?: string } | null> {
  if (!config.telegramBotToken) {
    console.warn("[telegram] TELEGRAM_BOT_TOKEN not set — publication skipped");
    return null;
  }

  const url = `https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`;
  const body = {
    chat_id: chatId,
    text,
    parse_mode: options?.parseMode || "HTML",
    disable_web_page_preview: false,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as {
    ok: boolean;
    result?: { message_id: number };
    description?: string;
  };

  if (!data.ok || !data.result) {
    throw new Error(data.description || "Telegram sendMessage failed");
  }

  const messageId = String(data.result.message_id);
  // Public post URL only works for public channels with username
  return { messageId };
}

export function formatFreeCallPost(params: {
  tokenName?: string | null;
  tokenTicker?: string | null;
  chain: string;
  tokenAddress?: string | null;
  referencePrice: string;
  currentPrice: string;
  multiplier: string;
  callerUsername?: string | null;
}): string {
  const name = params.tokenTicker || params.tokenName || "Token";
  return [
    `🚀 <b>Verified 2× Free Call</b>`,
    ``,
    `<b>${escapeHtml(name)}</b>`,
    `Chain: ${escapeHtml(params.chain)}`,
    params.tokenAddress ? `CA: <code>${escapeHtml(params.tokenAddress)}</code>` : "",
    ``,
    `Entry: $${params.referencePrice}`,
    `Now: $${params.currentPrice} (${params.multiplier}×)`,
    params.callerUsername ? `Caller: @${escapeHtml(params.callerUsername)}` : "",
    ``,
    `<i>Verified milestone via Fomo Whales. Not financial advice. DYOR.</i>`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function formatProCallPost(params: {
  tokenName: string;
  tokenTicker: string;
  chain: string;
  contractAddress?: string | null;
  promoText: string;
  callerUsername?: string | null;
}): string {
  return [
    `📢 <b>Sponsored Promotion</b>`,
    ``,
    `<b>${escapeHtml(params.tokenName)}</b> ($${escapeHtml(params.tokenTicker)})`,
    `Chain: ${escapeHtml(params.chain)}`,
    params.contractAddress
      ? `CA: <code>${escapeHtml(params.contractAddress)}</code>`
      : "",
    ``,
    escapeHtml(params.promoText),
    ``,
    params.callerUsername ? `By: @${escapeHtml(params.callerUsername)}` : "",
    ``,
    `<i>Sponsored via Fomo Whales. Not financial advice. DYOR.</i>`,
  ]
    .filter(Boolean)
    .join("\n");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
