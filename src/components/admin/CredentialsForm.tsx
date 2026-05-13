"use client";

import { useState, useTransition } from "react";

type Key =
  | "anthropic_auth_token"
  | "firecrawl_api_key"
  | "tavily_api_key"
  | "gmail_user"
  | "gmail_client_id"
  | "gmail_client_secret"
  | "gmail_refresh_token";

type Group = { title: string; description?: string; keys: Key[] };

const FIELDS: Record<
  Key,
  { label: string; hint: string; placeholder: string; type?: "email" | "text" }
> = {
  anthropic_auth_token: {
    label: "Claude (Anthropic) — OAuth subscription token",
    hint: "Generate locally with `claude setup-token`. Powers admin AI Assist and the NEMO chatbot via the Claude Agent SDK.",
    placeholder: "sk-ant-oat01-…",
  },
  firecrawl_api_key: {
    label: "Firecrawl — API key",
    hint: "Used for crawling competitor / reference URLs into draft posts.",
    placeholder: "fc-…",
  },
  tavily_api_key: {
    label: "Tavily — Search API key",
    hint: "Used by AI Assist to gather up-to-date research context before drafting.",
    placeholder: "tvly-…",
  },
  gmail_user: {
    label: "Gmail — Sender address",
    hint: "The Gmail address that the OAuth refresh token belongs to. Lead emails are sent from this account.",
    placeholder: "you@yourdomain.com",
    type: "email",
  },
  gmail_client_id: {
    label: "Gmail — OAuth Client ID",
    hint: "From the Google Cloud OAuth 2.0 client used to mint the refresh token below.",
    placeholder: "xxxxxxxx.apps.googleusercontent.com",
  },
  gmail_client_secret: {
    label: "Gmail — OAuth Client Secret",
    hint: "Pairs with the Client ID above.",
    placeholder: "GOCSPX-…",
  },
  gmail_refresh_token: {
    label: "Gmail — OAuth Refresh Token",
    hint: "Long-lived refresh token from OAuth Playground or your own consent flow. Used to mint short-lived access tokens for SMTP.",
    placeholder: "1//04…",
  },
};

const GROUPS: Group[] = [
  {
    title: "AI integrations",
    description: "API keys for Claude, research, and content tooling.",
    keys: ["anthropic_auth_token", "firecrawl_api_key", "tavily_api_key"],
  },
  {
    title: "Gmail OAuth (lead notification email)",
    description:
      "Credentials for sending lead notifications via Gmail SMTP using OAuth 2.0 (no app password).",
    keys: ["gmail_user", "gmail_client_id", "gmail_client_secret", "gmail_refresh_token"],
  },
];

type Props = {
  status: Record<Key, boolean>;
};

export function CredentialsForm({ status }: Props) {
  const [values, setValues] = useState<Record<Key, string>>(
    Object.fromEntries(Object.keys(FIELDS).map((k) => [k, ""])) as Record<Key, string>,
  );
  const [revealed, setRevealed] = useState<Record<Key, boolean>>(
    Object.fromEntries(Object.keys(FIELDS).map((k) => [k, false])) as Record<Key, boolean>,
  );
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function submit() {
    startTransition(async () => {
      setMsg(null);
      const payload = Object.fromEntries(
        Object.entries(values).filter(([, v]) => v.trim().length > 0),
      );
      if (Object.keys(payload).length === 0) {
        setMsg("Nothing to save — fill in at least one field.");
        return;
      }
      const res = await fetch("/api/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setMsg("Saved.");
        setValues(
          Object.fromEntries(Object.keys(FIELDS).map((k) => [k, ""])) as Record<Key, string>,
        );
        // refresh status badges
        setTimeout(() => window.location.reload(), 600);
      } else {
        setMsg(`Error: ${await res.text()}`);
      }
    });
  }

  async function clearKey(key: Key) {
    if (!confirm(`Remove ${key.replace(/_/g, " ")}?`)) return;
    const res = await fetch(`/api/credentials?key=${key}`, { method: "DELETE" });
    if (res.ok) window.location.reload();
    else setMsg(`Error: ${await res.text()}`);
  }

  return (
    <div className="space-y-6">
      {GROUPS.map((group) => (
        <div key={group.title} className="glass p-6 space-y-5">
          <div>
            <h3 className="font-display text-lg font-semibold">{group.title}</h3>
            {group.description && (
              <p className="text-xs text-(--color-muted) mt-1">{group.description}</p>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-7">
            {group.keys.map((k) => {
              const f = FIELDS[k];
              const isSet = status[k];
              const isRevealed = revealed[k];
              const inputType = f.type === "email" ? (isRevealed ? "email" : "email") : isRevealed ? "text" : "password";
              return (
                <div key={k} className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <label className="text-sm font-medium">{f.label}</label>
                    {isSet && (
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-(--color-green)/15 text-(--color-green) border border-(--color-green)/30">
                        SET
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={inputType}
                      value={values[k]}
                      onChange={(e) => setValues((v) => ({ ...v, [k]: e.target.value }))}
                      placeholder={isSet ? "•••••••• (unchanged)" : f.placeholder}
                      autoComplete="off"
                      spellCheck={false}
                      className="w-full px-4 py-3 pr-20 bg-white/3 border border-white/10 rounded-lg focus:outline-none focus:border-(--color-cyan) focus:ring-2 focus:ring-(--color-cyan)/20 transition font-mono text-sm"
                    />
                    <div className="absolute inset-y-0 right-2 flex items-center gap-1">
                      {f.type !== "email" && (
                        <button
                          type="button"
                          onClick={() =>
                            setRevealed((r) => ({ ...r, [k]: !r[k] }))
                          }
                          aria-label={isRevealed ? "Hide" : "Show"}
                          className="px-2 py-1 text-xs rounded hover:bg-white/10 text-white/60 hover:text-white transition"
                          title={isRevealed ? "Hide" : "Show"}
                        >
                          {isRevealed ? "Hide" : "Show"}
                        </button>
                      )}
                      {isSet && (
                        <button
                          type="button"
                          onClick={() => clearKey(k)}
                          aria-label="Remove"
                          className="px-2 py-1 text-xs rounded hover:bg-red-500/15 text-red-400 transition"
                          title="Remove stored value"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-(--color-muted)">{f.hint}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="glass p-4 flex items-center justify-between">
        <p className="text-xs text-(--color-muted) font-mono">
          [ ENCRYPTED AT REST · AES-256-GCM ]
        </p>
        <div className="flex items-center gap-3">
          {msg && <span className="text-xs text-(--color-cyan) font-mono">{msg}</span>}
          <button onClick={submit} disabled={pending} className="btn-primary disabled:opacity-50">
            {pending ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
