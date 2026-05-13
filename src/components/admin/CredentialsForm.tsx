"use client";

import { useState, useTransition } from "react";

type Key = "anthropic_auth_token" | "firecrawl_api_key" | "tavily_api_key";

const FIELDS: Array<{
  key: Key;
  label: string;
  hint: string;
  placeholder: string;
}> = [
  {
    key: "anthropic_auth_token",
    label: "Claude (Anthropic) — OAuth subscription token",
    hint: "Generate locally with `claude setup-token`. Powers admin AI Assist and the NEMO chatbot via the Claude Agent SDK.",
    placeholder: "sk-ant-oat01-…",
  },
  {
    key: "firecrawl_api_key",
    label: "Firecrawl — API key",
    hint: "Used for crawling competitor / reference URLs into draft posts.",
    placeholder: "fc-…",
  },
  {
    key: "tavily_api_key",
    label: "Tavily — Search API key",
    hint: "Used by AI Assist to gather up-to-date research context before drafting.",
    placeholder: "tvly-…",
  },
];

type Props = {
  status: Record<Key, boolean>;
};

export function CredentialsForm({ status }: Props) {
  const [values, setValues] = useState<Record<Key, string>>({
    anthropic_auth_token: "",
    firecrawl_api_key: "",
    tavily_api_key: "",
  });
  const [revealed, setRevealed] = useState<Record<Key, boolean>>({
    anthropic_auth_token: false,
    firecrawl_api_key: false,
    tavily_api_key: false,
  });
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function submit() {
    startTransition(async () => {
      setMsg(null);
      const res = await fetch("/api/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          Object.fromEntries(
            Object.entries(values).filter(([, v]) => v.trim().length > 0),
          ),
        ),
      });
      if (res.ok) {
        setMsg("Saved.");
        setValues({ anthropic_auth_token: "", firecrawl_api_key: "", tavily_api_key: "" });
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
    <div className="glass p-6 space-y-6">
      <div className="grid md:grid-cols-2 gap-x-6 gap-y-7">
        {FIELDS.map((f) => {
          const isSet = status[f.key];
          const isRevealed = revealed[f.key];
          return (
            <div key={f.key} className="space-y-2">
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
                  type={isRevealed ? "text" : "password"}
                  value={values[f.key]}
                  onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                  placeholder={isSet ? "•••••••• (unchanged)" : f.placeholder}
                  autoComplete="off"
                  spellCheck={false}
                  className="w-full px-4 py-3 pr-20 bg-white/3 border border-white/10 rounded-lg focus:outline-none focus:border-(--color-cyan) focus:ring-2 focus:ring-(--color-cyan)/20 transition font-mono text-sm"
                />
                <div className="absolute inset-y-0 right-2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setRevealed((r) => ({ ...r, [f.key]: !r[f.key] }))}
                    aria-label={isRevealed ? "Hide" : "Show"}
                    className="px-2 py-1 text-xs rounded hover:bg-white/10 text-white/60 hover:text-white transition"
                    title={isRevealed ? "Hide" : "Show"}
                  >
                    {isRevealed ? "Hide" : "Show"}
                  </button>
                  {isSet && (
                    <button
                      type="button"
                      onClick={() => clearKey(f.key)}
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

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
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
