import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { sendLeadEmail } from "@/lib/email";

const schema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  phone: z.string().max(50).optional().nullable(),
  company: z.string().max(255).optional().nullable(),
  message: z.string().min(1),
  source: z.string().max(100).optional().nullable(),
});

export async function POST(req: Request) {
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

  await db.insert(leads).values({
    name: data.name,
    email: data.email,
    phone: data.phone ?? null,
    company: data.company ?? null,
    message: data.message,
    source: data.source ?? null,
  });

  try {
    await sendLeadEmail({
      name: data.name,
      email: data.email,
      phone: data.phone ?? undefined,
      company: data.company ?? undefined,
      message: data.message,
      source: data.source ?? undefined,
    });
  } catch (err) {
    console.error("[contact] email send failed", err);
    // Lead is still saved in DB; don't fail the request
  }

  return NextResponse.json({ ok: true });
}
