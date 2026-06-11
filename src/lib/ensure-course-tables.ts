import { sql } from "drizzle-orm";
import { db } from "@/db";

/**
 * Idempotently create the `courses` + `course_modules` tables.
 *
 * Production applies schema out-of-band (the Docker image only runs the Next
 * server — no migrate/push step), and the prod DB isn't reachable from a dev
 * machine. The sync endpoint therefore calls this first so a `push-to-remote
 * courses` both provisions the tables and loads the data in one shot, with no
 * DB-console access required. Safe to run repeatedly.
 *
 * Relies on the `status` enum already existing (it does — `pages`/`posts` use
 * it). Each statement runs separately (the pg extended protocol rejects
 * multi-statement strings).
 */
export async function ensureCourseTables(): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS courses (
      id serial PRIMARY KEY,
      slug varchar(255) NOT NULL,
      title varchar(500) NOT NULL,
      course_code varchar(64),
      certificate text,
      summary text,
      overview text,
      outcomes text,
      who_should_enroll text,
      assessment varchar(255),
      price_excl_gst varchar(50),
      price_incl_gst varchar(50),
      funding_tags jsonb DEFAULT '[]'::jsonb,
      brochure_url text,
      hero_image text,
      status status NOT NULL DEFAULT 'draft',
      sort_order integer NOT NULL DEFAULT 0,
      seo_title varchar(500),
      seo_description text,
      created_at timestamp NOT NULL DEFAULT now(),
      updated_at timestamp NOT NULL DEFAULT now()
    );
  `);
  await db.execute(
    sql`CREATE UNIQUE INDEX IF NOT EXISTS courses_slug_uq ON courses (slug);`,
  );
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS course_modules (
      id serial PRIMARY KEY,
      course_id integer NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
      title varchar(500) NOT NULL,
      kind varchar(32),
      details text,
      sessions varchar(255),
      duration varchar(255),
      registration_link text,
      sort_order integer NOT NULL DEFAULT 0
    );
  `);
  await db.execute(
    sql`CREATE INDEX IF NOT EXISTS course_modules_course_idx ON course_modules (course_id);`,
  );
}
