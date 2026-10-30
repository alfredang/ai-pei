import { NextResponse } from "next/server";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { affiliates, affiliateReferrals } from "@/db/schema";
import { ensureAffiliateTables } from "@/lib/ensure-affiliate-tables";
import { sendApplicationEmail } from "@/lib/email";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { checkBlocklist } from "@/lib/lead-blocklist";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

/**
 * International-student application from /apply.html. `ref` is the affiliate
 * code from the tracking link; unknown or inactive codes are still saved (raw
 * code kept) but not attributed to an affiliate.
 */
const schema = z.object({
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(50),
  nationality: z.string().trim().min(1).max(100),
  program: z.string().trim().min(1).max(500),
  preferredStart: z.string().trim().min(1).max(50),
  message: z.string().max(5000).optional().nullable(),
  acknowledged: z.literal(true),
  ref: z.string().trim().max(64).optional().nullable(),
  turnstileToken: z.string().max(2048).optional().nullable(),
});

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limited = checkRateLimit(`apply:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  const captcha = await verifyTurnstileToken(data.turnstileToken, ip);
  if (!captcha.ok) {
    return NextResponse.json(
      { error: "Captcha verification failed", reason: captcha.reason },
      { status: 400 },
    );
  }

  const verdict = await checkBlocklist(data.email).catch(() => "neutral" as const);
  if (verdict === "block") return NextResponse.json({ ok: true });

  await ensureAffiliateTables();

  const code = data.ref?.toLowerCase() || null;
  const [affiliate] = code
    ? await db
        .select({ id: affiliates.id, name: affiliates.name, code: affiliates.code })
        .from(affiliates)
        .where(and(eq(affiliates.code, code), eq(affiliates.active, true)))
        .limit(1)
    : [];

  await db.insert(affiliateReferrals).values({
    affiliateId: affiliate?.id ?? null,
    affiliateCode: code,
    name: data.name,
    email: data.email,
    phone: data.phone,
    nationality: data.nationality,
    program: data.program,
    preferredStart: data.preferredStart,
    message: data.message || null,
  });

  try {
    await sendApplicationEmail({
      ...data,
      affiliate: affiliate
        ? `${affiliate.name} (${affiliate.code})`
        : code
          ? `Unknown code "${code}"`
          : "Direct (no affiliate)",
    });
  } catch (err) {
    console.error("[apply] email send failed", err);
    // Application is still saved in DB; don't fail the request
  }

  return NextResponse.json({ ok: true });
}
