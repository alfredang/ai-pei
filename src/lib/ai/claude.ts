import { query } from "@anthropic-ai/claude-agent-sdk";

const SYSTEM_PROMPTS: Record<string, string> = {
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
  if (!process.env.ANTHROPIC_AUTH_TOKEN) {
    throw new Error("ANTHROPIC_AUTH_TOKEN is not configured");
  }
  const systemPrompt = SYSTEM_PROMPTS[mode];
  if (!systemPrompt) throw new Error(`Unknown AI assist mode: ${mode}`);

  const chunks: string[] = [];
  const response = query({
    prompt: userContext,
    options: {
      systemPrompt,
      permissionMode: "bypassPermissions",
      allowedTools: [],
      env: { ANTHROPIC_AUTH_TOKEN: process.env.ANTHROPIC_AUTH_TOKEN },
    },
  });

  for await (const msg of response) {
    if (msg.type === "assistant") {
      for (const block of msg.message.content) {
        if (block.type === "text") chunks.push(block.text);
      }
    }
  }
  return chunks.join("").trim();
}
