import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../src/db";
import { users, menus, menuItems, settings } from "../src/db/schema";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
  }

  const [existing] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (existing) {
    console.log(`Admin ${email} already exists (id=${existing.id})`);
  } else {
    const passwordHash = await bcrypt.hash(password, 10);
    const [u] = await db
      .insert(users)
      .values({ email, passwordHash, name: "Administrator", role: "admin" })
      .returning();
    console.log(`Created admin user id=${u.id} email=${email}`);
  }

  // Seed default menus
  for (const location of ["header", "footer"] as const) {
    const [m] = await db
      .select()
      .from(menus)
      .where(eq(menus.location, location))
      .limit(1);
    if (!m) {
      const [created] = await db
        .insert(menus)
        .values({ location, name: location === "header" ? "Main" : "Footer" })
        .returning();
      const items =
        location === "header"
          ? [
              { label: "Home", href: "/" },
              { label: "Services", href: "/#services" },
              { label: "LMS/TMS", href: "/#ai-lms-tms" },
              { label: "Blog", href: "/blog" },
              { label: "Portfolio", href: "/portfolio" },
              { label: "Contact", href: "/#contact" },
            ]
          : [
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "Contact", href: "/#contact" },
            ];
      await db.insert(menuItems).values(
        items.map((it, i) => ({
          menuId: created.id,
          label: it.label,
          href: it.href,
          sortOrder: i,
        })),
      );
      console.log(`Seeded ${location} menu with ${items.length} items`);
    }
  }

  // Seed core settings
  const defaults: Record<string, unknown> = {
    site_title: "Tertiary Infotech",
    tagline: "AI-LMS-TMS for WSQ & TPQA Compliance",
    contact_email: process.env.LEAD_NOTIFICATION_EMAIL ?? "sales@tertiarycourses.com.sg",
    social: {
      linkedin: "https://www.linkedin.com/company/tertiary-courses",
      facebook: "",
    },
  };
  for (const [key, value] of Object.entries(defaults)) {
    await db
      .insert(settings)
      .values({ key, value: value as object })
      .onConflictDoNothing();
  }
  console.log("Seeded default settings");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
