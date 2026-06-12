import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../src/db";
import { users } from "../src/db/schema";

async function main() {
  const email = "angss@tertiaryinfotech.com";
  const password = process.env.ANGSS_PASSWORD;
  if (!password) {
    throw new Error("ANGSS_PASSWORD must be set in .env");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const [existing] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (existing) {
    await db
      .update(users)
      .set({ passwordHash, role: "admin", name: "Ang" })
      .where(eq(users.email, email));
    console.log(`Updated existing admin ${email}`);
  } else {
    const [u] = await db
      .insert(users)
      .values({ email, passwordHash, name: "Ang", role: "admin" })
      .returning();
    console.log(`Created admin id=${u.id} email=${email}`);
  }
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
