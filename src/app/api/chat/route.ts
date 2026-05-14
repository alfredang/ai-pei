import { NextResponse } from "next/server";
import { query } from "@anthropic-ai/claude-agent-sdk";
import { getCredential } from "@/lib/secrets";
import { buildSystemPrompt, getChatbotSettings, renderSystemPrompt } from "@/lib/chatbot-settings";
import { buildClaudeEnv } from "@/lib/anthropic-auth";
import { tryFaqMatch, tryGreeting } from "@/lib/chatbot-harness";
import { getSiteBrand } from "@/lib/site-settings";

export const maxDuration = 120;

type Msg = { role: "user" | "model"; content: string };

export async function POST(req: Request) {
  try {
    const { message, history = [] } = (await req.json()) as {
      message: string;
      history?: Msg[];
    };
    if (!message?.trim()) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    // ── Fast path 1: greeting → instant canned reply, no SDK spawn.
    const brand = await getSiteBrand();
    const greet = tryGreeting(message, brand.shortName);
    if (greet) return NextResponse.json({ response: greet });

    const settings = await getChatbotSettings();

    // ── Fast path 2: admin-configured FAQ match → instant.
    const faqHit = tryFaqMatch(message, settings.faq);
    if (faqHit) return NextResponse.json({ response: faqHit });

    // ── Fallback: Claude Agent SDK with subscription OAuth token.
    const token = await getCredential("anthropic_auth_token");
    if (!token) {
      return NextResponse.json(
        { error: "Chatbot not configured. Add a Claude OAuth token in Admin → Settings → Credentials." },
        { status: 503 },
      );
    }

    const systemPrompt = await renderSystemPrompt(buildSystemPrompt(settings));

    const conversation = [...history, { role: "user" as const, content: message }]
      .slice(-10)
      .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content.trim()}`)
      .filter(Boolean)
      .join("\n\n");

    let resultText = "";

    for await (const msg of query({
      prompt: conversation,
      options: {
        env: buildClaudeEnv(token),
        systemPrompt,
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

    return NextResponse.json({
      response: resultText.trim() || "Sorry, I couldn't generate a reply.",
    });
  } catch (err) {
    console.error("[chat] error", err);
    const message = err instanceof Error ? err.message : "Chat failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
