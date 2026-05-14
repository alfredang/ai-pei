"use client";

import { useState } from "react";

export type AIAssistMode =
  | "generate_full_post"
  | "generate_blog_draft"
  | "improve_seo"
  | "summarize"
  | "suggest_meta"
  | "rewrite";

type Props = {
  mode: AIAssistMode;
  context: string; // title / current content / topic
  onResult: (text: string) => void;
  label?: string;
};

export function AIAssistButton({ mode, context, onResult, label }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, context }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as { text: string };
      onResult(data.text);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="inline-flex flex-col">
      <button
        type="button"
        onClick={run}
        disabled={loading}
        className="px-3 py-1.5 text-xs rounded bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 disabled:opacity-50 font-medium"
      >
        {loading ? "✨ Thinking…" : `✨ AI ${label ?? "Assist"}`}
      </button>
      {error && <span className="text-xs text-red-400 mt-1">{error}</span>}
    </div>
  );
}
