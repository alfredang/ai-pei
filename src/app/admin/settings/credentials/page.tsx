import { getCredentialSource, type CredentialKey } from "@/lib/secrets";
import { CredentialsForm } from "@/components/admin/CredentialsForm";

const KEYS: CredentialKey[] = [
  "anthropic_auth_token",
  "firecrawl_api_key",
  "tavily_api_key",
  "gmail_user",
  "gmail_client_id",
  "gmail_client_secret",
  "gmail_refresh_token",
];

export default async function CredentialsPage() {
  const sourceEntries = await Promise.all(
    KEYS.map(async (k) => [k, await getCredentialSource(k)] as const),
  );
  const sources = Object.fromEntries(sourceEntries) as Record<
    CredentialKey,
    "db" | "env" | "none"
  >;
  const status = Object.fromEntries(
    sourceEntries.map(([k, s]) => [k, s !== "none"]),
  ) as Record<CredentialKey, boolean>;

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-xl font-bold">Credentials</h2>
        <p className="text-sm text-(--color-muted) mt-1">
          API keys and OAuth tokens for AI integrations and outbound email. Values are AES-256-GCM
          encrypted at rest and never returned to the browser once saved. Leave a field blank to
          keep the existing value.
        </p>
        <p className="text-xs text-(--color-muted) mt-2 font-mono">
          <span className="text-(--color-green)">ADMIN</span> = saved here ·{" "}
          <span className="text-(--color-amber)">ENV FALLBACK</span> = code is reading the
          server env var (save here to migrate) ·{" "}
          <span className="text-white/60">NOT SET</span> = feature is disabled
        </p>
      </div>
      <CredentialsForm status={status} sources={sources} />
    </div>
  );
}
