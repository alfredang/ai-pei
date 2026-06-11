/**
 * Server-side helper to read the admin's role + email from the session JWT.
 * Mirrors admin-guard.ts: we decode the JWT directly with next-auth/jwt rather
 * than calling auth(), which has been flaky in our route handlers.
 *
 * Returns { role: "admin" | "editor" | "author", email } if a valid JWT is
 * present, else null. Treat null as "not signed in".
 */
import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import { ADMIN_COOKIE_NAME, verifyAdminSessionValue } from "@/lib/admin-session";

export type AdminRole = "admin" | "editor" | "author";

export async function getAdminSession(): Promise<{
  role: AdminRole;
  email: string;
  id: string;
} | null> {
  const jar = await cookies();

  const custom = verifyAdminSessionValue(jar.get(ADMIN_COOKIE_NAME)?.value);
  if (custom) {
    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        role: users.role,
      })
      .from(users)
      .where(eq(users.id, custom.userId))
      .limit(1);
    if (user && user.email === custom.email) {
      return {
        role: user.role,
        email: user.email,
        id: String(user.id),
      };
    }
  }

  const cookieHeader = jar
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;
  try {
    const token = await getToken({
      req: { headers: { cookie: cookieHeader } } as unknown as Request,
      secret,
      cookieName:
        process.env.NODE_ENV === "production"
          ? "__Secure-authjs.session-token"
          : "authjs.session-token",
    });
    if (!token) return null;
    const email = typeof token.email === "string" ? token.email : "";
    const uid = typeof token.uid === "string" ? Number(token.uid) : NaN;
    if (!email) return null;
    const [user] = Number.isFinite(uid)
      ? await db
          .select({
            id: users.id,
            email: users.email,
            role: users.role,
          })
          .from(users)
          .where(eq(users.id, uid))
          .limit(1)
      : await db
          .select({
            id: users.id,
            email: users.email,
            role: users.role,
          })
          .from(users)
          .where(eq(users.email, email))
          .limit(1);
    if (!user || user.email !== email) return null;
    return {
      role: user.role,
      email: user.email,
      id: String(user.id),
    };
  } catch {
    return null;
  }
}

export function canAccessRoute(role: AdminRole, pathname: string): boolean {
  if (role === "admin") return true;
  if (role === "editor") {
    // Editor: same as admin except cannot manage users or credentials.
    return !(
      pathname.startsWith("/admin/users") ||
      pathname.startsWith("/admin/settings/credentials")
    );
  }
  // Author: only dashboard + own posts + media upload (for embedding images).
  return (
    pathname === "/admin" ||
    pathname.startsWith("/admin/posts") ||
    pathname.startsWith("/admin/media")
  );
}
