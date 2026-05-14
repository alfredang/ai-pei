import { timingSafeEqual } from "node:crypto";

/**
 * Bearer-token guard for the /api/admin/sync/* endpoints.
 * Fails closed when SYNC_API_TOKEN isn't configured.
 */
export function syncAuthorized(req: Request): boolean {
  const expected = process.env.SYNC_API_TOKEN;
  if (!expected) return false;
  const header = req.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header);
  if (!match) return false;
  const a = Buffer.from(match[1]);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
