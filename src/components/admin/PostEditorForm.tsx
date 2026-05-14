"use client";

import { useState, useTransition } from "react";
import { Editor } from "./Editor";
import { AIAssistButton } from "./AIAssistButton";
import type { JSONContent } from "@tiptap/react";

export type PostFormData = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: JSONContent;
  contentHtml: string;
  status: "draft" | "published" | "archived";
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  ogImage: string;
  featuredImage: string;
  /** Suggested category slug from AI Assist — resolved server-side on save. */
  suggestedCategorySlug?: string;
  /** Suggested tag slugs from AI Assist — resolved/created server-side on save. */
  suggestedTagSlugs?: string[];
};

type Props = {
  initial: PostFormData;
  save: (data: PostFormData) => Promise<void>;
  kind: "post" | "page";
};

export function PostEditorForm({ initial, save, kind }: Props) {
  const [data, setData] = useState<PostFormData>(initial);
  const [pending, startTransition] = useTransition();
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [topic, setTopic] = useState("");

  function update<K extends keyof PostFormData>(key: K, value: PostFormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  async function fetchAndApplyImage(query: string, slug: string) {
    setImageLoading(true);
    setImageError(null);
    try {
      const res = await fetch("/api/ai/post-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, slug }),
      });
      const data = (await res.json()) as { ok?: boolean; url?: string; error?: string };
      if (!res.ok || !data.ok || !data.url) {
        throw new Error(data.error || `Image fetch failed (${res.status})`);
      }
      setData((d) => ({ ...d, featuredImage: data.url! }));
    } catch (e) {
      setImageError(e instanceof Error ? e.message : "Image fetch failed");
    } finally {
      setImageLoading(false);
    }
  }

  function applyAiPost(raw: string) {
    // Claude returns JSON; tolerate leading/trailing fences if model slips.
    let json = raw.trim();
    if (json.startsWith("```")) {
      json = json.replace(/^```(?:json)?/, "").replace(/```$/, "").trim();
    }
    let obj: Partial<{
      title: string;
      slug: string;
      excerpt: string;
      contentHtml: string;
      seoTitle: string;
      seoDescription: string;
      seoKeywords: string;
      imageQuery: string;
      categorySlug: string;
      tagSlugs: string[];
    }> = {};
    try {
      obj = JSON.parse(json);
    } catch {
      // If parse fails, dump the whole response into the body so nothing is lost.
      update("contentHtml", raw);
      return;
    }
    setData((d) => ({
      ...d,
      title: obj.title || d.title,
      slug: obj.slug || d.slug,
      excerpt: obj.excerpt || d.excerpt,
      contentHtml: obj.contentHtml || d.contentHtml,
      content: obj.contentHtml
        ? {
            type: "doc",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: obj.contentHtml }],
              },
            ],
          }
        : d.content,
      seoTitle: obj.seoTitle || d.seoTitle,
      seoDescription: obj.seoDescription || d.seoDescription,
      seoKeywords: obj.seoKeywords || d.seoKeywords,
      suggestedCategorySlug: obj.categorySlug || d.suggestedCategorySlug,
      suggestedTagSlugs: Array.isArray(obj.tagSlugs) ? obj.tagSlugs : d.suggestedTagSlugs,
    }));

    // Kick off image generation in parallel — non-blocking.
    if (obj.imageQuery && kind === "post") {
      void fetchAndApplyImage(obj.imageQuery, obj.slug || data.slug);
    }
  }

  function submit() {
    startTransition(async () => {
      await save(data);
      setSavedAt(new Date());
    });
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {kind === "post" && (
          <div className="glass rounded-xl p-4 space-y-2 border border-(--color-purple)/30">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase text-(--color-purple) tracking-wider">
                AI prompt — generate full post
              </label>
              <AIAssistButton
                mode="generate_full_post"
                context={`TOPIC: ${topic || data.title || "(no topic)"}`}
                onResult={applyAiPost}
                label="Generate full post"
              />
            </div>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={2}
              placeholder="Enter a topic. e.g. 'WSQ funding changes 2026 for SME training providers' — Claude will draft the title, slug, content, excerpt, and all SEO fields."
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm"
            />
            <p className="text-[11px] text-white/40">
              Powered by the Claude Agent SDK with your subscription OAuth token. Populates title, slug, content, excerpt, and SEO fields below — review then click Save.
            </p>
          </div>
        )}
        <div>
          <label className="text-xs uppercase text-white/50">Title</label>
          <div className="flex gap-2 items-start">
            <input
              value={data.title}
              onChange={(e) => update("title", e.target.value)}
              className="flex-1 px-3 py-2 text-2xl font-bold bg-white/5 border border-white/10 rounded focus:outline-none focus:border-neon-blue"
            />
          </div>
        </div>
        <div>
          <label className="text-xs uppercase text-white/50">Slug</label>
          <input
            value={data.slug}
            onChange={(e) => update("slug", e.target.value)}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-neon-blue font-mono text-sm"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs uppercase text-white/50">Content</label>
            <AIAssistButton
              mode="generate_blog_draft"
              context={`Topic: ${data.title || "(no title)"}\nCurrent excerpt: ${data.excerpt}`}
              onResult={(text) => {
                update("contentHtml", text);
                update("content", {
                  type: "doc",
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text }],
                    },
                  ],
                });
              }}
              label="Draft"
            />
          </div>
          <Editor
            value={data.content}
            onChange={(json, html) => {
              update("content", json);
              update("contentHtml", html);
            }}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs uppercase text-white/50">Excerpt</label>
            <AIAssistButton
              mode="summarize"
              context={data.contentHtml || data.title}
              onResult={(text) => update("excerpt", text)}
              label="Summarize"
            />
          </div>
          <textarea
            value={data.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-neon-blue"
          />
        </div>
      </div>

      <aside className="space-y-4">
        <div className="glass rounded-xl p-4 space-y-3">
          <h3 className="font-bold">Publish</h3>
          <label className="block">
            <span className="text-xs text-white/60">Status</span>
            <select
              value={data.status}
              onChange={(e) =>
                update("status", e.target.value as PostFormData["status"])
              }
              className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </label>
          <button
            onClick={submit}
            disabled={pending}
            className="w-full py-2 rounded bg-gradient-to-r from-neon-blue to-neon-cyan font-semibold disabled:opacity-50"
          >
            {pending ? "Saving…" : "Save"}
          </button>
          {savedAt && (
            <p className="text-xs text-neon-cyan">Saved {savedAt.toLocaleTimeString()}</p>
          )}
        </div>

        {kind === "post" && (data.suggestedCategorySlug || (data.suggestedTagSlugs?.length ?? 0) > 0) && (
          <div className="glass rounded-xl p-4 space-y-2 border border-(--color-purple)/30">
            <h3 className="font-bold text-sm">AI suggestions (applied on Save)</h3>
            {data.suggestedCategorySlug && (
              <p className="text-xs">
                <span className="text-white/50">Category:</span>{" "}
                <span className="font-mono text-(--color-cyan)">{data.suggestedCategorySlug}</span>
              </p>
            )}
            {data.suggestedTagSlugs && data.suggestedTagSlugs.length > 0 && (
              <p className="text-xs">
                <span className="text-white/50">Tags:</span>{" "}
                <span className="font-mono text-(--color-purple)">
                  {data.suggestedTagSlugs.join(", ")}
                </span>
              </p>
            )}
            <p className="text-[11px] text-white/40">
              Existing slugs are reused; unknown slugs will be created automatically on save.
            </p>
          </div>
        )}
        {kind === "post" && (
          <div className="glass rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">Featured image</h3>
              {imageLoading && (
                <span className="text-xs text-(--color-purple) animate-pulse">
                  ✨ Fetching image…
                </span>
              )}
            </div>
            <input
              value={data.featuredImage}
              onChange={(e) => update("featuredImage", e.target.value)}
              placeholder="/blog/hero.jpg or absolute URL"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm"
            />
            {imageError && <p className="text-xs text-red-400">{imageError}</p>}
            {data.featuredImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.featuredImage} alt="" className="rounded mt-2" />
            )}
          </div>
        )}

        <div className="glass rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">SEO</h3>
            <AIAssistButton
              mode="suggest_meta"
              context={`Title: ${data.title}\n\n${data.contentHtml.slice(0, 4000)}`}
              onResult={(text) => {
                try {
                  const obj = JSON.parse(text) as { title?: string; description?: string };
                  if (obj.title) update("seoTitle", obj.title);
                  if (obj.description) update("seoDescription", obj.description);
                } catch {
                  update("seoDescription", text);
                }
              }}
              label="Suggest"
            />
          </div>
          <Field
            label="SEO title"
            value={data.seoTitle}
            onChange={(v) => update("seoTitle", v)}
          />
          <Field
            label="Meta description"
            value={data.seoDescription}
            onChange={(v) => update("seoDescription", v)}
            multi
          />
          <Field
            label="Keywords"
            value={data.seoKeywords}
            onChange={(v) => update("seoKeywords", v)}
          />
          <Field
            label="OG image URL"
            value={data.ogImage}
            onChange={(v) => update("ogImage", v)}
          />
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  multi,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multi?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs text-white/60">{label}</span>
      {multi ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded text-sm"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded text-sm"
        />
      )}
    </label>
  );
}
