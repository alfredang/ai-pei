import { sql } from "drizzle-orm";
import { db } from "@/db";

export const REFERRAL_STATUSES = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "batch_confirmed", label: "Batch confirmed" },
  { value: "contract_sent", label: "Contract sent" },
  { value: "enrolled", label: "Enrolled" },
  { value: "withdrawn", label: "Withdrawn" },
] as const;

let ready: Promise<void> | null = null;

/**
 * Idempotently create the `affiliates` + `affiliate_referrals` tables.
 *
 * Same reason as ensureCourseTables(): production applies schema out-of-band
 * and its DB isn't reachable from a dev machine, so the affiliate admin pages
 * and /api/apply call this before touching the tables. Memoised per process;
 * a failure clears the memo so the next request retries.
 */
export function ensureAffiliateTables(): Promise<void> {
  ready ??= create().catch((err) => {
    ready = null;
    throw err;
  });
  return ready;
}

async function create(): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS affiliates (
      id serial PRIMARY KEY,
      code varchar(64) NOT NULL UNIQUE,
      name varchar(255) NOT NULL,
      email varchar(255),
      phone varchar(50),
      country varchar(100),
      notes text,
      active boolean NOT NULL DEFAULT true,
      created_at timestamp NOT NULL DEFAULT now()
    );
  `);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS affiliate_referrals (
      id serial PRIMARY KEY,
      affiliate_id integer REFERENCES affiliates(id) ON DELETE SET NULL,
      affiliate_code varchar(64),
      name varchar(255) NOT NULL,
      email varchar(255) NOT NULL,
      phone varchar(50) NOT NULL,
      nationality varchar(100) NOT NULL,
      program varchar(500) NOT NULL,
      preferred_start varchar(50) NOT NULL,
      mode varchar(20),
      message text,
      status varchar(32) NOT NULL DEFAULT 'new',
      created_at timestamp NOT NULL DEFAULT now()
    );
  `);
  // Added after the first deploy — upgrade tables created before it.
  await db.execute(sql`ALTER TABLE affiliate_referrals ADD COLUMN IF NOT EXISTS mode varchar(20);`);
  await db.execute(
    sql`CREATE INDEX IF NOT EXISTS affiliate_referrals_affiliate_idx ON affiliate_referrals (affiliate_id);`,
  );
  await db.execute(
    sql`CREATE INDEX IF NOT EXISTS affiliate_referrals_created_idx ON affiliate_referrals (created_at);`,
  );
}
