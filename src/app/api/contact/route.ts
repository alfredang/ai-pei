import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { sendLeadEmail } from "@/lib/email";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { checkBlocklist } from "@/lib/lead-blocklist";
import { computeLeadScore } from "@/lib/lead-score";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  phone: z.string().max(50).optional().nullable(),
  nationality: z.string().max(100).optional().nullable(),
  nric: z.string().max(50).optional().nullable(),
  gender: z.string().max(50).optional().nullable(),
  dob: z.string().max(50).optional().nullable(),
  residency: z.string().max(100).optional().nullable(),
  course: z.string().max(500).optional().nullable(),
  module: z.string().max(500).optional().nullable(),
  company: z.string().max(255).optional().nullable(),
  message: z.string().max(10000).optional().nullable(),
  source: z.string().max(100).optional().nullable(),
  turnstileToken: z.string().max(2048).optional().nullable(),
});

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limited = checkRateLimit(`contact:${ip}`, {
    limit: 8,
    windowMs: 10 * 60 * 1000,
  });
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
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

  // Spam blocklist — allow rules win over block rules.
  const verdict = await checkBlocklist(data.email).catch(() => "neutral" as const);
  if (verdict === "block") {
    // Return success so we don't tip off the sender; just don't store or email.
    return NextResponse.json({ ok: true });
  }

  // Format the extended registration data into the message field
  const registrationDetails = [
    `Course Interested: ${data.course || "N/A"}`,
    `Module of Interest: ${data.module || "N/A"}`,
    `Nationality: ${data.nationality || "N/A"}`,
    `NRIC: ${data.nric || "N/A"}`,
    `Gender: ${data.gender || "N/A"}`,
    `DOB: ${data.dob || "N/A"}`,
    `Residency Status: ${data.residency || "N/A"}`,
    ``,
    `Message: ${data.message || "No message provided."}`
  ].join("\n");

  const score = computeLeadScore({
    name: data.name,
    email: data.email,
    phone: data.phone ?? null,
    company: data.company || "Individual",
    message: registrationDetails,
  });

  await db.insert(leads).values({
    name: data.name,
    email: data.email,
    phone: data.phone ?? null,
    company: data.company || "Individual",
    message: registrationDetails,
    source: data.source ?? null,
    score,
  });

  try {
    await sendLeadEmail({
      name: data.name,
      email: data.email,
      phone: data.phone ?? undefined,
      company: data.company || "Individual",
      message: registrationDetails,
      source: data.source ?? undefined,
    });
  } catch (err) {
    console.error("[contact] email send failed", err);
    // Lead is still saved in DB; don't fail the request
  }

  return NextResponse.json({ ok: true });
}
