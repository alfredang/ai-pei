/**
 * Lightweight chatbot harness — FAQ-first fast path.
 *
 * Answers common questions instantly from the admin-configured FAQ before
 * the request ever reaches the Claude Agent SDK. The SDK still handles
 * anything not matched, but most visitor questions (greeting, services,
 * contact, pricing) are deterministic and don't need an LLM call.
 *
 * We deliberately do NOT use the public Anthropic Messages API or any
 * pay-per-call API key — the only LLM path in this app is the Claude
 * Agent SDK with a subscription OAuth token.
 */
import type { FaqEntry } from "@/lib/chatbot-settings";

/** Try to answer instantly from the FAQ. Returns null on no confident match. */
export function tryFaqMatch(message: string, faq: FaqEntry[]): string | null {
  const q = message.trim().toLowerCase();
  if (q.length < 2 || faq.length === 0) return null;

  // 1) Substring either direction — stored question contained in the user's
  //    message, or the user's message contained in the stored question.
  for (const entry of faq) {
    const stored = entry.question.trim().toLowerCase();
    if (!stored) continue;
    if (q.includes(stored) || stored.includes(q)) return entry.answer;
  }

  // 2) Token overlap — ≥ 60% of stored-question tokens appear in the user's
  //    message. Tokens shorter than 3 chars are ignored to avoid noise.
  const userTokens = new Set(q.split(/\W+/).filter((t) => t.length > 2));
  if (userTokens.size === 0) return null;
  let best: { score: number; answer: string } | null = null;
  for (const entry of faq) {
    const tokens = entry.question.toLowerCase().split(/\W+/).filter((t) => t.length > 2);
    if (tokens.length === 0) continue;
    const hit = tokens.filter((t) => userTokens.has(t)).length;
    const score = hit / tokens.length;
    if (score >= 0.6 && (!best || score > best.score)) {
      best = { score, answer: entry.answer };
    }
  }
  return best?.answer ?? null;
}

/** Canned replies for one-word greetings — instant, no LLM needed. */
const GREETING_REGEX = /^(hi|hello|hey|yo|hola|sup|good\s*(morning|afternoon|evening))[!\.\?]*$/i;
export function tryGreeting(message: string, brand: string): string | null {
  if (!GREETING_REGEX.test(message.trim())) return null;
  return `Hi there! I'm Nemo, an AI assistant for ${brand}. Ask me about our SSG service, LMS, TMS, AI solutions, or anything else — happy to help.`;
}
