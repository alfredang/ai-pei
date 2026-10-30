import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { affiliates } from "@/db/schema";
import { syncAuthorized } from "@/lib/sync-auth";
import { ensureAffiliateTables } from "@/lib/ensure-affiliate-tables";

/**
 * Upsert affiliates by `code` (natural key). Lets affiliates be provisioned on
 * production from a dev machine, same auth as the rest of /api/admin/sync.
 * Referrals are not synced — they only ever originate on the live site.
 */
const affiliateSchema = z.object({
  code: z.string().regex(/^[a-z0-9-]{1,64}$/),
  name: z.string().min(1).max(255),
  email: z.string().email().max(255).optional().nullable(),
  phone: z.string().max(50).optional().nullable(),
  country: z.string().max(100).optional().nullable(),
  notes: z.string().max(5000).optional().nullable(),
  active: z.boolean().optional().default(true),
});

const bodySchema = z.object({ affiliates: z.array(affiliateSchema).max(500) });

export async function POST(req: Request) {
  if (!(await syncAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  await ensureAffiliateTables();

  for (const a of parsed.data.affiliates) {
    const values = {
      name: a.name,
      email: a.email ?? null,
      phone: a.phone ?? null,
      country: a.country ?? null,
      notes: a.notes ?? null,
      active: a.active,
    };
    await db
      .insert(affiliates)
      .values({ code: a.code, ...values })
      .onConflictDoUpdate({ target: affiliates.code, set: values });
  }
  return NextResponse.json({ ok: true, upserted: parsed.data.affiliates.length });
}
