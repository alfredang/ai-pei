import { isCredentialSet } from "@/lib/secrets";
import { CredentialsForm } from "@/components/admin/CredentialsForm";

export default async function CredentialsPage() {
  const [
    anthropicSet,
    firecrawlSet,
    tavilySet,
    gmailUserSet,
    gmailClientIdSet,
    gmailClientSecretSet,
    gmailRefreshTokenSet,
  ] = await Promise.all([
    isCredentialSet("anthropic_auth_token"),
    isCredentialSet("firecrawl_api_key"),
    isCredentialSet("tavily_api_key"),
    isCredentialSet("gmail_user"),
    isCredentialSet("gmail_client_id"),
    isCredentialSet("gmail_client_secret"),
    isCredentialSet("gmail_refresh_token"),
  ]);

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-xl font-bold">Credentials</h2>
        <p className="text-sm text-(--color-muted) mt-1">
          API keys and OAuth tokens for AI integrations and outbound email. Values are AES-256-GCM
          encrypted at rest and never returned to the browser once saved. Leave a field blank to
          keep the existing value.
        </p>
      </div>
      <CredentialsForm
        status={{
          anthropic_auth_token: anthropicSet,
          firecrawl_api_key: firecrawlSet,
          tavily_api_key: tavilySet,
          gmail_user: gmailUserSet,
          gmail_client_id: gmailClientIdSet,
          gmail_client_secret: gmailClientSecretSet,
          gmail_refresh_token: gmailRefreshTokenSet,
        }}
      />
    </div>
  );
}
