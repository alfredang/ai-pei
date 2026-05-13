import { db } from "@/db";
import { settings } from "@/db/schema";
import { inArray } from "drizzle-orm";

export type FaqEntry = { question: string; answer: string };

export type ChatbotSettings = {
  systemPrompt: string;
  faq: FaqEntry[];
};

export const DEFAULT_SYSTEM_PROMPT = `You are the AI assistant for Tertiary Infotech Pte Ltd, a Singapore-based provider of AI-powered LMS, TMS and custom software for training providers.

Company facts:
- We build AI-LMS-TMS, a Learning + Training Management platform that is WSQ and TPQA compliant.
- Services: Training Management System (TMS), Learning Management System (LMS), AI-powered solutions, custom software development, blockchain certificates (OpenCerts), TRAQOM compliance dashboards.
- Target audience: training providers, L&D managers, and adult-learning centres in Singapore.
- Contact: sales@tertiarycourses.com.sg
- UEN: 201200606W

Tone and behaviour:
- Be professional, friendly and concise. Two to four sentences is usually enough.
- If asked about pricing, custom scope, demos or timelines, invite the visitor to fill in the contact form on this page or email sales@tertiarycourses.com.sg.
- If a question is outside Tertiary Infotech's services, answer briefly and steer back to how we can help.
- Never invent facts about specific clients, prices or SLAs. If unsure, say you'll connect them with the team.

Use the FAQ context below as authoritative answers when relevant.`;

const KEY_PROMPT = "chat:system_prompt";
const KEY_FAQ = "chat:faq";

export async function getChatbotSettings(): Promise<ChatbotSettings> {
  try {
    const rows = await db
      .select()
      .from(settings)
      .where(inArray(settings.key, [KEY_PROMPT, KEY_FAQ]));
    let systemPrompt = DEFAULT_SYSTEM_PROMPT;
    let faq: FaqEntry[] = [];
    for (const r of rows) {
      if (r.key === KEY_PROMPT && typeof r.value === "string" && r.value.trim()) {
        systemPrompt = r.value;
      } else if (r.key === KEY_FAQ && Array.isArray(r.value)) {
        faq = (r.value as FaqEntry[]).filter(
          (e) => e && typeof e.question === "string" && typeof e.answer === "string",
        );
      }
    }
    return { systemPrompt, faq };
  } catch {
    return { systemPrompt: DEFAULT_SYSTEM_PROMPT, faq: [] };
  }
}

export async function saveChatbotSettings(input: ChatbotSettings): Promise<void> {
  const prompt = input.systemPrompt.trim() || DEFAULT_SYSTEM_PROMPT;
  const faq = input.faq
    .map((e) => ({ question: e.question.trim(), answer: e.answer.trim() }))
    .filter((e) => e.question && e.answer);

  await db
    .insert(settings)
    .values({ key: KEY_PROMPT, value: prompt as unknown as object })
    .onConflictDoUpdate({
      target: settings.key,
      set: { value: prompt as unknown as object, updatedAt: new Date() },
    });
  await db
    .insert(settings)
    .values({ key: KEY_FAQ, value: faq as unknown as object })
    .onConflictDoUpdate({
      target: settings.key,
      set: { value: faq as unknown as object, updatedAt: new Date() },
    });
}

export function buildSystemPrompt(s: ChatbotSettings): string {
  if (!s.faq.length) return s.systemPrompt;
  const faqText = s.faq
    .map((e, i) => `Q${i + 1}: ${e.question}\nA${i + 1}: ${e.answer}`)
    .join("\n\n");
  return `${s.systemPrompt}\n\n--- FAQ ---\n${faqText}`;
}
