"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

export type PostRow = {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "published" | "archived";
  updatedAt: string; // ISO
};

type Props = {
  rows: PostRow[];
  /** Server action: receives the selected post IDs and deletes them + their tag links. */
  deleteMany: (ids: number[]) => Promise<void>;
};

export function PostsBulkTable({ rows, deleteMany }: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const allChecked = rows.length > 0 && rows.every((r) => selected.has(r.id));
  const someChecked = rows.some((r) => selected.has(r.id)) && !allChecked;

  function toggleAll() {
    setSelected(allChecked ? new Set() : new Set(rows.map((r) => r.id)));
  }

  function toggleOne(id: number) {
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function onDelete() {
    if (selected.size === 0) return;
    const ids = Array.from(selected);
    const ok = window.confirm(
      `Delete ${ids.length} post${ids.length === 1 ? "" : "s"}? This cannot be undone.`,
    );
    if (!ok) return;
    setError(null);
    startTransition(async () => {
      try {
        await deleteMany(ids);
        setSelected(new Set());
      } catch (e) {
        setError(e instanceof Error ? e.message : "Delete failed");
      }
    });
  }

  return (
    <>
      {selected.size > 0 && (
        <div className="mb-2 flex items-center justify-between px-3 py-2 rounded-lg border border-(--color-purple)/30 bg-(--color-purple)/10 text-sm">
          <span className="font-mono text-(--color-purple)">
            {selected.size} selected
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelected(new Set())}
              className="px-3 py-1 text-xs rounded border border-white/10 hover:bg-white/5"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={onDelete}
              disabled={pending}
              className="px-3 py-1 text-xs rounded bg-red-500/20 border border-red-500/40 hover:bg-red-500/30 text-red-200 disabled:opacity-50"
            >
              {pending ? "Deleting…" : `Delete ${selected.size}`}
            </button>
          </div>
        </div>
      )}
      {error && (
        <p className="mb-2 text-xs text-red-400 px-3 py-2 rounded border border-red-500/30 bg-red-500/5">
          {error}
        </p>
      )}
      <div className="glass rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm whitespace-nowrap">
          <thead className="bg-white/5 text-left text-xs uppercase tracking-wider text-white/60">
            <tr>
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={allChecked}
                  ref={(el) => {
                    if (el) el.indeterminate = someChecked;
                  }}
                  onChange={toggleAll}
                  aria-label="Select all"
                  className="accent-(--color-cyan) cursor-pointer w-4 h-4"
                />
              </th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Updated</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selected.has(p.id)}
                    onChange={() => toggleOne(p.id)}
                    aria-label={`Select ${p.title}`}
                    className="accent-(--color-cyan) cursor-pointer w-4 h-4"
                  />
                </td>
                <td className="px-4 py-3">
                  <Link className="hover:text-(--color-cyan)" href={`/admin/posts/${p.id}/edit`}>
                    {p.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-white/60 font-mono text-xs">{p.slug}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs uppercase tracking-wider ${
                      p.status === "published"
                        ? "bg-emerald-500/15 text-emerald-300"
                        : p.status === "draft"
                          ? "bg-amber-500/15 text-amber-300"
                          : "bg-white/10 text-white/60"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/60">
                  {new Date(p.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-white/50">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
