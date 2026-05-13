import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import {
  setCredential,
  clearCredential,
  type CredentialKey,
} from "@/lib/secrets";

const ALLOWED: CredentialKey[] = [
  "anthropic_auth_token",
  "firecrawl_api_key",
  "tavily_api_key",
  "gmail_user",
  "gmail_client_id",
  "gmail_client_secret",
  "gmail_refresh_token",
];

const payloadSchema = z.record(z.string(), z.string().min(1).max(2000));

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = payloadSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  for (const [key, value] of Object.entries(parsed.data)) {
    if (!ALLOWED.includes(key as CredentialKey)) continue;
    await setCredential(key as CredentialKey, value);
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const key = new URL(req.url).searchParams.get("key") as CredentialKey | null;
  if (!key || !ALLOWED.includes(key)) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }
  await clearCredential(key);
  return NextResponse.json({ ok: true });
}
