import { NextResponse } from "next/server";
import { db } from "@/db";
import { syncAuthorized } from "@/lib/sync-auth";
import { sql } from "drizzle-orm";

/**
 * Idempotent schema migration runner. Re-applies the column/enum/table
 * additions that drizzle-kit would otherwise apply locally — but on
 * whichever environment is hosting this endpoint. Safe to call multiple
 * times; uses IF NOT EXISTS where supported and ADD VALUE IF NOT EXISTS
 * for enum extensions.
 *
 * POST /api/admin/sync/migrate with bearer or basic auth.
 */
export async function POST(req: Request) {
  if (!(await syncAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const ran: string[] = [];

  // 1) lead_blocklist table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS lead_blocklist (
      id serial PRIMARY KEY,
      pattern varchar(255) NOT NULL,
      kind varchar(16) NOT NULL,
      reason text,
      created_at timestamp NOT NULL DEFAULT now()
    )
  `);
  await db.execute(sql`
    CREATE UNIQUE INDEX IF NOT EXISTS lead_blocklist_pattern_uq
      ON lead_blocklist (pattern, kind)
  `);
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS lead_blocklist_kind_idx
      ON lead_blocklist (kind)
  `);
  ran.push("lead_blocklist table + indexes");

  // 2) leads.score
  await db.execute(sql`ALTER TABLE leads ADD COLUMN IF NOT EXISTS score integer`);
  ran.push("leads.score column");

  // 3) posts.view_count
  await db.execute(sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS view_count integer NOT NULL DEFAULT 0`);
  ran.push("posts.view_count column");

  // 4) posts.featured
  await db.execute(sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS featured boolean NOT NULL DEFAULT false`);
  ran.push("posts.featured column");

  // 5) pages.category_id
  await db.execute(sql`ALTER TABLE pages ADD COLUMN IF NOT EXISTS category_id integer`);
  ran.push("pages.category_id column");

  // 6) lead_status enum: add 'follow_up'
  await db.execute(sql`
    DO $$ BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_enum
        WHERE enumlabel = 'follow_up'
          AND enumtypid = 'lead_status'::regtype
      ) THEN
        ALTER TYPE lead_status ADD VALUE 'follow_up' BEFORE 'contacted';
      END IF;
    END $$
  `);
  ran.push("lead_status: follow_up");

  return NextResponse.json({ ok: true, ran });
}
