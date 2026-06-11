/**
 * Lightweight admin guard for API routes.
 *
 * Only verified sessions are accepted. A raw cookie name is not enough:
 * custom admin sessions must pass the HMAC check and resolve to a real user,
 * and legacy NextAuth sessions must decode as valid JWTs.
 */
import { cookies } from "next/headers";
import { getAdminSession } from "@/lib/admin-role";
import { ADMIN_COOKIE_NAME, verifyAdminSessionValue } from "./admin-session";

export async function isAdminRequest(): Promise<boolean> {
  const jar = await cookies();
  const ours = jar.get(ADMIN_COOKIE_NAME)?.value;
  if (ours && !verifyAdminSessionValue(ours)) return false;
  return Boolean(await getAdminSession());
}
