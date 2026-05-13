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

  function update<K extends keyof PostFormData>(key: K, value: PostFormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
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

        {kind === "post" && (
          <div className="glass rounded-xl p-4 space-y-2">
            <h3 className="font-bold">Featured image</h3>
            <input
              value={data.featuredImage}
              onChange={(e) => update("featuredImage", e.target.value)}
              placeholder="/blog/hero.jpg or absolute URL"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm"
            />
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
