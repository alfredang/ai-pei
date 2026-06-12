/**
 * Ad-hoc: create or update an admin user with a chosen email + password.
 * Usage: tsx --env-file=.env scripts/create-admin.ts <email> <password> [name]
 */
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../src/db";
import { users } from "../src/db/schema";

async function main() {
  const [email, password, name = "Admin"] = process.argv.slice(2);
  if (!email || !password) {
    console.error("Usage: tsx scripts/create-admin.ts <email> <password> [name]");
    process.exit(1);
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existing) {
    await db.update(users).set({ passwordHash, name, role: "admin" }).where(eq(users.email, email));
    console.log(`Updated existing user id=${existing.id} email=${email} (password reset, role=admin)`);
  } else {
    const [created] = await db
      .insert(users)
      .values({ email, passwordHash, name, role: "admin" })
      .returning({ id: users.id });
    console.log(`Created admin user id=${created.id} email=${email}`);
  }
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
