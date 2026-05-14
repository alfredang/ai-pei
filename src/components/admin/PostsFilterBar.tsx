"use client";

import Link from "next/link";
import { useRef } from "react";

type Category = { id: number; slug: string; name: string };

type Props = {
  q: string;
  status: string;
  categorySlug: string;
  sortKey: string;
  from: string;
  to: string;
  count: number;
  categories: Category[];
  sorts: { key: string; label: string }[];
  hasAnyFilter: boolean;
};

export function PostsFilterBar({
  q,
  status,
  categorySlug,
  sortKey,
  from,
  to,
  count,
  categories,
  sorts,
  hasAnyFilter,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const autoSubmit = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <form
      ref={formRef}
      method="get"
      className="flex flex-wrap items-center gap-2 mb-3 glass rounded-lg p-3"
    >
      <input
        name="q"
        defaultValue={q}
        placeholder="Search title or slug…"
        className="flex-1 min-w-[200px] px-3 py-1.5 text-sm rounded-md bg-white/5 border border-white/10 focus:outline-none focus:border-(--color-cyan) focus:ring-1 focus:ring-(--color-cyan)/30"
      />
      <select
        name="status"
        defaultValue={status}
        onChange={autoSubmit}
        className="px-3 py-1.5 text-sm rounded-md bg-white/5 border border-white/10 focus:outline-none focus:border-(--color-cyan)"
      >
        <option value="">All statuses</option>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
        <option value="archived">Archived</option>
      </select>
      <select
        name="category"
        defaultValue={categorySlug}
        onChange={autoSubmit}
        className="px-3 py-1.5 text-sm rounded-md bg-white/5 border border-white/10 focus:outline-none focus:border-(--color-cyan)"
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>
      <select
        name="sort"
        defaultValue={sortKey}
        onChange={autoSubmit}
        className="px-3 py-1.5 text-sm rounded-md bg-white/5 border border-white/10 focus:outline-none focus:border-(--color-cyan)"
      >
        {sorts.map((s) => (
          <option key={s.key} value={s.key}>
            {s.label}
          </option>
        ))}
      </select>
      <label className="text-xs text-white/50 flex items-center gap-1">
        From
        <input
          type="date"
          name="from"
          defaultValue={from}
          onChange={autoSubmit}
          className="px-2 py-1.5 text-sm rounded-md bg-white/5 border border-white/10 focus:outline-none focus:border-(--color-cyan)"
        />
      </label>
      <label className="text-xs text-white/50 flex items-center gap-1">
        To
        <input
          type="date"
          name="to"
          defaultValue={to}
          onChange={autoSubmit}
          className="px-2 py-1.5 text-sm rounded-md bg-white/5 border border-white/10 focus:outline-none focus:border-(--color-cyan)"
        />
      </label>
      <button
        type="submit"
        className="px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/15 border border-white/10"
      >
        Search
      </button>
      {hasAnyFilter && (
        <Link
          href="/admin/posts"
          className="px-3 py-1.5 text-sm rounded-md text-white/60 hover:text-white"
        >
          Reset
        </Link>
      )}
      <div className="ml-auto text-xs text-white/50 whitespace-nowrap">
        {count} {count === 1 ? "post" : "posts"}
      </div>
    </form>
  );
}
