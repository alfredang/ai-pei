import { query } from "@anthropic-ai/claude-agent-sdk";
import { getCredential } from "@/lib/secrets";
import { buildClaudeEnv } from "@/lib/anthropic-auth";

const SYSTEM_PROMPTS: Record<string, string> = {
  generate_full_post: `You are a senior content writer and SEO specialist for Tertiary Infotech Academy, a Singapore B2B training-tech company. Audience: training providers, L&D managers, and tech leaders in Singapore.

Given a TOPIC, produce a complete, ready-to-publish blog post.

Return ONLY valid JSON matching this exact shape (no markdown fences, no prose before or after):
{
  "title": "Concise, click-worthy title under 70 chars",
  "slug": "kebab-case-slug-derived-from-title",
  "excerpt": "1-2 sentence summary for blog cards, under 200 chars",
  "contentHtml": "Full body as semantic HTML — <h2>, <h3>, <p>, <ul>, <ol>, <strong>. 600–1200 words. Do NOT include <h1> (the title field is the H1).",
  "seoTitle": "Under 60 chars, primary keyword near the start",
  "seoDescription": "Under 155 chars, compelling, includes primary keyword",
  "seoKeywords": "comma, separated, keywords, max 8",
  "imageQuery": "A 3-6 word phrase for stock-image search that matches the post",
  "categorySlug": "Slug of the BEST-matching category from the EXISTING_CATEGORIES list in the user message. Only invent a new slug if none of the existing categories fit.",
  "tagSlugs": ["3-6 tags as slugs. Reuse from EXISTING_TAGS where possible; new tags should be kebab-case and concise."]
}

Rules:
- Use Singapore/British spelling (organisation, optimise, programme).
- Reference Singapore context (SSG, WSQ, IMDA, MOM) only when relevant — do not force it.
- Brand name in copy: "Tertiary Infotech Academy" (not "Tertiary Infotech").
- contentHtml must be valid HTML with paragraphs in <p> tags and headings as <h2>/<h3>.
- Keep paragraphs short (2-3 sentences max) for scannability.
- Open with a hook, end with a clear call to action.
- If REFERENCE_CONTENT blocks are present in the user message, they are scraped from URLs the admin pasted. Use them as primary source material — pull concrete facts, course names, funding amounts, dates, eligibility criteria, etc. straight from them. Do not just paraphrase; weave the specifics in.`,
  generate_blog_draft:
    "You are a senior content writer for Tertiary Infotech, a Singapore B2B training-tech company. Write a structured, SEO-friendly blog draft in clean Markdown with H2/H3 headings and short paragraphs. Audience: training providers and L&D managers in Singapore.",
  improve_seo:
    "You are an SEO specialist. Rewrite the supplied text to be more search-friendly: tighter, keyword-aware, scannable. Keep the original meaning. Return only the rewritten text.",
  summarize:
    "Summarise the supplied content in 2–3 short sentences suitable for a blog excerpt / meta description. Return only the summary, no preamble.",
  suggest_meta:
    "Generate an SEO meta title (under 60 chars) and a meta description (under 155 chars) for the supplied content. Return ONLY a JSON object: {\"title\": string, \"description\": string}.",
  rewrite:
    "Rewrite the supplied text in a clearer, more engaging tone while keeping the meaning. Return only the rewritten text.",
};

export async function runClaudeAssist(
  mode: keyof typeof SYSTEM_PROMPTS,
  userContext: string,
): Promise<string> {
  const token = await getCredential("anthropic_auth_token");
  if (!token) {
    throw new Error(
      "Claude OAuth token not configured. Set it in Admin → Settings → Credentials.",
    );
  }
  const systemPrompt = SYSTEM_PROMPTS[mode];
  if (!systemPrompt) throw new Error(`Unknown AI assist mode: ${mode}`);

  // Mirror /api/chat (Nemo)'s SDK options exactly — that path works on live,
  // this one was failing with 401 because `permissionMode: "bypassPermissions"`
  // triggers a different auth path that doesn't accept the OAuth subscription
  // token. The combination below (maxTurns 1, allowedTools [], disallowedTools
  // listing every potentially-auth-requiring tool) is what the chatbot uses.
  let resultText = "";
  for await (const msg of query({
    prompt: userContext,
    options: {
      systemPrompt,
      env: buildClaudeEnv(token),
      maxTurns: 1,
      allowedTools: [],
      disallowedTools: ["Bash", "Read", "Write", "Edit", "Glob", "Grep", "WebSearch", "WebFetch"],
    },
  })) {
    if (msg.type === "result" && (msg as { subtype?: string }).subtype === "success") {
      const r = (msg as { result?: string }).result;
      if (r) resultText = r;
    }
    if (msg.type === "assistant") {
      for (const block of msg.message.content) {
        if (block.type === "text" && !resultText) resultText += block.text;
      }
    }
  }
  return resultText.trim();
}
