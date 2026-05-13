import crypto from "node:crypto";
import { db } from "@/db";
import { settings } from "@/db/schema";
import { eq } from "drizzle-orm";

const ALG = "aes-256-gcm";

function getKey(): Buffer {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is required to encrypt credentials");
  return crypto.createHash("sha256").update(secret).digest();
}

export function encryptSecret(plaintext: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALG, getKey(), iv);
  const enc = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv, tag, enc].map((b) => b.toString("base64")).join(".");
}

export function decryptSecret(blob: string): string {
  const [ivB, tagB, encB] = blob.split(".");
  if (!ivB || !tagB || !encB) throw new Error("Invalid encrypted secret");
  const iv = Buffer.from(ivB, "base64");
  const tag = Buffer.from(tagB, "base64");
  const enc = Buffer.from(encB, "base64");
  const decipher = crypto.createDecipheriv(ALG, getKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(enc), decipher.final()]).toString("utf8");
}

export type CredentialKey =
  | "anthropic_auth_token"
  | "firecrawl_api_key"
  | "tavily_api_key"
  | "gmail_user"
  | "gmail_client_id"
  | "gmail_client_secret"
  | "gmail_refresh_token";

/**
 * Read a credential. DB-stored encrypted value wins over the env var fallback.
 * Returns null when neither is configured.
 */
export async function getCredential(key: CredentialKey): Promise<string | null> {
  try {
    const [row] = await db
      .select()
      .from(settings)
      .where(eq(settings.key, `cred:${key}`))
      .limit(1);
    if (row && typeof row.value === "string" && row.value.length > 0) {
      return decryptSecret(row.value);
    }
  } catch {
    // fall through to env
  }
  const envMap: Record<CredentialKey, string | undefined> = {
    anthropic_auth_token: process.env.ANTHROPIC_AUTH_TOKEN,
    firecrawl_api_key: process.env.FIRECRAWL_API_KEY,
    tavily_api_key: process.env.TAVILY_API_KEY,
    gmail_user: process.env.GMAIL_USER,
    gmail_client_id: process.env.GMAIL_CLIENT_ID,
    gmail_client_secret: process.env.GMAIL_CLIENT_SECRET,
    gmail_refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  };
  return envMap[key] ?? null;
}

export async function setCredential(key: CredentialKey, plaintext: string): Promise<void> {
  const enc = encryptSecret(plaintext);
  await db
    .insert(settings)
    .values({ key: `cred:${key}`, value: enc as unknown as object })
    .onConflictDoUpdate({
      target: settings.key,
      set: { value: enc as unknown as object, updatedAt: new Date() },
    });
}

export async function clearCredential(key: CredentialKey): Promise<void> {
  await db.delete(settings).where(eq(settings.key, `cred:${key}`));
}

export async function isCredentialSet(key: CredentialKey): Promise<boolean> {
  return (await getCredential(key)) !== null;
}
