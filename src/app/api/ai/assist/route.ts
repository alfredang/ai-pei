import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequest } from "@/lib/admin-guard";
import { runClaudeAssist } from "@/lib/ai/claude";

const schema = z.object({
  mode: z.enum([
    "generate_full_post",
    "generate_blog_draft",
    "improve_seo",
    "summarize",
    "suggest_meta",
    "rewrite",
  ]),
  context: z.string().min(1).max(20000),
});

export async function POST(req: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  try {
    const text = await runClaudeAssist(parsed.data.mode, parsed.data.context);
    return NextResponse.json({ text });
  } catch (err) {
    console.error("[ai/assist] error", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
