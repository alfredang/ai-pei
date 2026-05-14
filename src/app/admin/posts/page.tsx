import Link from "next/link";
import { db } from "@/db";
import { posts, postTags, categories, tags } from "@/db/schema";
import { and, asc, desc, eq, gte, ilike, inArray, lte, or, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PostsBulkTable } from "@/components/admin/PostsBulkTable";

type Search = {
  q?: string;
  status?: string;
  category?: string;
  sort?: string;
  from?: string;
  to?: string;
  page?: string;
};

const PAGE_SIZE = 20;

const SORTS = {
  created_desc: { col: posts.createdAt, dir: "desc" as const, label: "Newest first" },
  created_asc: { col: posts.createdAt, dir: "asc" as const, label: "Oldest first" },
  updated_desc: { col: posts.updatedAt, dir: "desc" as const, label: "Recently updated" },
  updated_asc: { col: posts.updatedAt, dir: "asc" as const, label: "Least recently updated" },
};

export default async function PostsList({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const status = sp.status ?? "";
  const categorySlug = sp.category ?? "";
  const sortKey = (sp.sort && sp.sort in SORTS ? sp.sort : "created_desc") as keyof typeof SORTS;
  const from = sp.from ?? "";
  const to = sp.to ?? "";
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);

  // Resolve category filter to id (if any).
  const allCats = await db.select().from(categories).orderBy(asc(categories.name));
  const cat = categorySlug ? allCats.find((c) => c.slug === categorySlug) : null;

  const filters = [] as any[];
  if (q) {
    filters.push(or(ilike(posts.title, `%${q}%`), ilike(posts.slug, `%${q}%`)));
  }
  if (status === "draft" || status === "published" || status === "archived") {
    filters.push(eq(posts.status, status));
  }
  if (cat) {
    filters.push(eq(posts.categoryId, cat.id));
  }
  if (from) {
    const d = new Date(from);
    if (!isNaN(d.getTime())) filters.push(gte(posts.createdAt, d));
  }
  if (to) {
    // Inclusive end-of-day.
    const d = new Date(to);
    if (!isNaN(d.getTime())) {
      d.setHours(23, 59, 59, 999);
      filters.push(lte(posts.createdAt, d));
    }
  }
  const where = filters.length ? and(...filters) : undefined;

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(posts)
    .where(where);
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const sortDef = SORTS[sortKey];
  const orderClause = sortDef.dir === "desc" ? desc(sortDef.col) : asc(sortDef.col);

  const list = await db
    .select()
    .from(posts)
    .where(where)
    .orderBy(orderClause)
    .limit(PAGE_SIZE)
    .offset((currentPage - 1) * PAGE_SIZE);

  // Fetch tags + categories for the visible rows in one query each.
  const visibleIds = list.map((p) => p.id);
  const catById = new Map(allCats.map((c) => [c.id, c]));

  const tagRows = visibleIds.length
    ? await db
        .select({
          postId: postTags.postId,
          tagId: tags.id,
          name: tags.name,
          slug: tags.slug,
        })
        .from(postTags)
        .innerJoin(tags, eq(tags.id, postTags.tagId))
        .where(inArray(postTags.postId, visibleIds))
    : [];
  const tagsByPostId = new Map<number, { name: string; slug: string }[]>();
  for (const t of tagRows) {
    const arr = tagsByPostId.get(t.postId) ?? [];
    arr.push({ name: t.name, slug: t.slug });
    tagsByPostId.set(t.postId, arr);
  }

  async function createPost() {
    "use server";
    const [p] = await db
      .insert(posts)
      .values({
        slug: `untitled-${Date.now()}`,
        title: "Untitled post",
        content: { type: "doc", content: [{ type: "paragraph" }] },
        status: "draft",
      })
      .returning();
    revalidatePath("/admin/posts");
    redirect(`/admin/posts/${p.id}/edit`);
  }

  async function deleteMany(ids: number[]) {
    "use server";
    if (!Array.isArray(ids) || ids.length === 0) return;
    await db.delete(postTags).where(inArray(postTags.postId, ids));
    await db.delete(posts).where(inArray(posts.id, ids));
    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
  }

  const buildHref = (overrides: Partial<Search>) => {
    const params = new URLSearchParams();
    const merged: Search = { q, status, category: categorySlug, sort: sortKey, from, to, ...overrides };
    if (merged.q) params.set("q", merged.q);
    if (merged.status) params.set("status", merged.status);
    if (merged.category) params.set("category", merged.category);
    if (merged.sort && merged.sort !== "created_desc") params.set("sort", merged.sort);
    if (merged.from) params.set("from", merged.from);
    if (merged.to) params.set("to", merged.to);
    if (merged.page && merged.page !== "1") params.set("page", merged.page);
    const qs = params.toString();
    return qs ? `/admin/posts?${qs}` : "/admin/posts";
  };

  const hasAnyFilter = !!(q || status || categorySlug || from || to || sortKey !== "created_desc");

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Posts</h1>
        <form action={createPost}>
          <button className="px-4 py-2 rounded bg-neon-blue/30 border border-neon-blue/50 hover:bg-neon-blue/40 text-sm font-medium">
            + New Post
          </button>
        </form>
      </div>

      <form
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
          className="px-3 py-1.5 text-sm rounded-md bg-white/5 border border-white/10 focus:outline-none focus:border-(--color-cyan)"
        >
          <option value="">All categories</option>
          {allCats.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          name="sort"
          defaultValue={sortKey}
          className="px-3 py-1.5 text-sm rounded-md bg-white/5 border border-white/10 focus:outline-none focus:border-(--color-cyan)"
        >
          {Object.entries(SORTS).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label}
            </option>
          ))}
        </select>
        <label className="text-xs text-white/50 flex items-center gap-1">
          From
          <input
            type="date"
            name="from"
            defaultValue={from}
            className="px-2 py-1.5 text-sm rounded-md bg-white/5 border border-white/10 focus:outline-none focus:border-(--color-cyan)"
          />
        </label>
        <label className="text-xs text-white/50 flex items-center gap-1">
          To
          <input
            type="date"
            name="to"
            defaultValue={to}
            className="px-2 py-1.5 text-sm rounded-md bg-white/5 border border-white/10 focus:outline-none focus:border-(--color-cyan)"
          />
        </label>
        <button
          type="submit"
          className="px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/15 border border-white/10"
        >
          Filter
        </button>
        {hasAnyFilter && (
          <Link
            href="/admin/posts"
            className="px-3 py-1.5 text-sm rounded-md text-white/60 hover:text-white"
          >
            Reset
          </Link>
        )}
        <div className="ml-auto text-xs text-white/50">
          {count} {count === 1 ? "post" : "posts"}
        </div>
      </form>

      <PostsBulkTable
        rows={list.map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          status: p.status,
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString(),
          category: p.categoryId ? catById.get(p.categoryId)?.name ?? null : null,
          tags: tagsByPostId.get(p.id) ?? [],
        }))}
        deleteMany={deleteMany}
      />

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-3 text-xs text-white/60">
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-1">
            <PageLink
              href={buildHref({ page: String(Math.max(1, currentPage - 1)) })}
              disabled={currentPage === 1}
            >
              ← Prev
            </PageLink>
            {pageNumbers(currentPage, totalPages).map((n, i) =>
              n === "…" ? (
                <span key={`e${i}`} className="px-2 text-white/40">
                  …
                </span>
              ) : (
                <Link
                  key={n}
                  href={buildHref({ page: String(n) })}
                  className={`px-2.5 py-1 rounded ${
                    n === currentPage
                      ? "bg-(--color-cyan)/20 text-(--color-cyan) border border-(--color-cyan)/40"
                      : "hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {n}
                </Link>
              ),
            )}
            <PageLink
              href={buildHref({ page: String(Math.min(totalPages, currentPage + 1)) })}
              disabled={currentPage === totalPages}
            >
              Next →
            </PageLink>
          </div>
        </div>
      )}
    </div>
  );
}

function PageLink({
  href,
  disabled,
  children,
}: {
  href: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  if (disabled) {
    return (
      <span className="px-2.5 py-1 rounded border border-white/5 text-white/30 cursor-not-allowed">
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className="px-2.5 py-1 rounded border border-white/10 hover:bg-white/10"
    >
      {children}
    </Link>
  );
}

function pageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) out.push("…");
  for (let i = start; i <= end; i++) out.push(i);
  if (end < total - 1) out.push("…");
  out.push(total);
  return out;
}
