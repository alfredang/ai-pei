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
  return `Hi there! I'm Nemo, an AI assistant for ${brand}. Ask me about our SSG service, LMS, TMS, AI solutions, or anything else — happy to help.

If you'd like a quote, demo, or to speak to our team, just say so and I'll take a few details.`;
}

// ─── Lead-capture flow ──────────────────────────────────────────────────────
//
// Nemo doubles as a lead magnet. When a visitor expresses intent (quote,
// demo, pricing, contact, consultation, speak to a human…), we walk them
// through Name → Email → Phone and post the result to /api/contact under
// source="nemo". State is recovered each turn by inspecting the recent
// conversation, so the API stays stateless.

export type Msg = { role: "user" | "model"; content: string };

const INTENT_KEYWORDS = [
  "quote",
  "quotation",
  "pricing",
  "price",
  "how much",
  "cost",
  "fee",
  "demo",
  "demonstration",
  "consult",
  "consultation",
  "speak to",
  "talk to",
  "call me",
  "contact me",
  "human",
  "agent",
  "sales",
  "rep",
  "interested",
  "engage",
  "book",
  "appointment",
  "meeting",
  "proposal",
  "rfp",
  "tender",
  "budget",
  "scope",
  "buy",
  "purchase",
  "trial",
  "lead",
];

const NAME_PROMPT = "Happy to set that up — could I get your **name** first?";
const EMAIL_PROMPT = "Thanks {name}. What's the best **email** to send the proposal / follow-up to?";
const PHONE_PROMPT =
  "Got it. And a **mobile / contact number** (with country code if possible)? — type _skip_ if you'd rather not share.";
const DONE_TEMPLATE =
  "Thanks {name} — I've sent your details to our team at angch@tertiaryinfotech.com. Expect a reply within 1 business day. Anything else you'd like to ask in the meantime?";

export type LeadField = "name" | "email" | "phone" | null;

export type LeadCaptureState = {
  active: boolean;
  name: string | null;
  email: string | null;
  phone: string | null;
  awaiting: LeadField;
  startedTurn: number; // index in history where the flow began
};

const EMAIL_REGEX = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
// Allow +, spaces, dashes, parens, dots; require at least 7 digits.
const PHONE_REGEX = /(\+?\d[\d\s().-]{6,}\d)/;

function detectIntent(text: string): boolean {
  const lower = text.toLowerCase();
  return INTENT_KEYWORDS.some((kw) => lower.includes(kw));
}

function extractEmail(text: string): string | null {
  const m = text.match(EMAIL_REGEX);
  return m ? m[0] : null;
}

function extractPhone(text: string): string | null {
  const m = text.match(PHONE_REGEX);
  if (!m) return null;
  const digits = m[0].replace(/[^\d]/g, "");
  if (digits.length < 7) return null;
  return m[0].trim();
}

function extractName(text: string): string | null {
  // Treat the whole user line as the name when we're explicitly waiting for
  // it. Strip common framings like "i'm …", "my name is …", "this is …".
  const stripped = text
    .trim()
    .replace(/^(hi|hello|hey)[,!\.\s]*/i, "")
    .replace(/^(my name is|i am|i'm|im|this is|name[:\s]*)\s*/i, "")
    .replace(/[.!?]+$/, "")
    .trim();
  if (!stripped) return null;
  // Reject if it looks like an email or phone — those are different fields.
  if (EMAIL_REGEX.test(stripped) || PHONE_REGEX.test(stripped)) return null;
  if (stripped.length > 60) return null;
  if (stripped.length < 2) return null;
  return stripped;
}

/**
 * Walk back through history to reconstruct the current capture state.
 * The model side stores prompts containing markers (NAME_PROMPT etc) — the
 * presence of a prompt and the following user reply tells us which slot is
 * filled or pending.
 */
export function buildCaptureState(history: Msg[], latestUserMsg: string): LeadCaptureState {
  const all: Msg[] = [...history, { role: "user", content: latestUserMsg }];
  const state: LeadCaptureState = {
    active: false,
    name: null,
    email: null,
    phone: null,
    awaiting: null,
    startedTurn: -1,
  };

  for (let i = 0; i < all.length; i++) {
    const m = all[i];
    if (m.role === "user" && !state.active && detectIntent(m.content)) {
      state.active = true;
      state.awaiting = "name";
      state.startedTurn = i;
      continue;
    }
    if (!state.active) continue;

    if (m.role === "model") {
      // Detect which slot the model just asked about by the prompt marker.
      if (m.content.includes("could I get your **name**")) state.awaiting = "name";
      else if (m.content.includes("best **email**")) state.awaiting = "email";
      else if (m.content.includes("**mobile / contact number**")) state.awaiting = "phone";
    } else if (state.awaiting) {
      // User just answered the pending slot.
      if (state.awaiting === "name") {
        const v = extractName(m.content);
        if (v) {
          state.name = v;
          state.awaiting = state.email ? (state.phone ? null : "phone") : "email";
        }
      } else if (state.awaiting === "email") {
        const v = extractEmail(m.content);
        if (v) {
          state.email = v;
          state.awaiting = state.phone ? null : "phone";
        }
      } else if (state.awaiting === "phone") {
        if (/^\s*skip\s*$/i.test(m.content)) {
          state.phone = null;
          state.awaiting = null;
        } else {
          const v = extractPhone(m.content);
          if (v) {
            state.phone = v;
            state.awaiting = null;
          }
        }
      }
    }
  }

  return state;
}

export function nextCapturePrompt(state: LeadCaptureState): string | null {
  if (!state.active) return null;
  if (state.awaiting === "name") return NAME_PROMPT;
  if (state.awaiting === "email") return EMAIL_PROMPT.replace("{name}", state.name ?? "there");
  if (state.awaiting === "phone") return PHONE_PROMPT;
  return null;
}

export function captureDoneMessage(state: LeadCaptureState): string {
  return DONE_TEMPLATE.replace("{name}", state.name ?? "there");
}

export function buildLeadMessageFromHistory(history: Msg[]): string {
  // The "message" stored on the lead is the conversation summary so the
  // recipient sees what the visitor actually asked Nemo.
  const lines = history
    .filter((m) => m.content.trim())
    .slice(-20)
    .map((m) => `${m.role === "user" ? "Visitor" : "Nemo"}: ${m.content.trim()}`);
  return lines.join("\n");
}
