import Link from "next/link";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type Search = {
  q?: string;
  status?: string;
  page?: string;
};

const PAGE_SIZE = 20;

export default async function PostsList({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const status = sp.status ?? "";
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);

  const filters = [] as any[];
  if (q) {
    filters.push(or(ilike(posts.title, `%${q}%`), ilike(posts.slug, `%${q}%`)));
  }
  if (status === "draft" || status === "published" || status === "archived") {
    filters.push(eq(posts.status, status));
  }
  const where = filters.length ? and(...filters) : undefined;

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(posts)
    .where(where);
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const list = await db
    .select()
    .from(posts)
    .where(where)
    .orderBy(desc(posts.updatedAt))
    .limit(PAGE_SIZE)
    .offset((currentPage - 1) * PAGE_SIZE);

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

  const pageHref = (p: number) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (status) params.set("status", status);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/admin/posts?${qs}` : "/admin/posts";
  };

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
        <button
          type="submit"
          className="px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/15 border border-white/10"
        >
          Filter
        </button>
        {(q || status) && (
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

      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-white/5 text-left text-[10px] uppercase tracking-wider text-white/60">
            <tr>
              <th className="px-3 py-2 font-medium">Title</th>
              <th className="px-3 py-2 font-medium">Slug</th>
              <th className="px-3 py-2 font-medium w-24">Status</th>
              <th className="px-3 py-2 font-medium w-40">Updated</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr
                key={p.id}
                className="border-t border-white/5 hover:bg-white/5"
              >
                <td className="px-3 py-1.5">
                  <Link
                    className="hover:text-neon-cyan"
                    href={`/admin/posts/${p.id}/edit`}
                  >
                    {p.title}
                  </Link>
                </td>
                <td className="px-3 py-1.5 text-white/60 font-mono text-[11px]">
                  {p.slug}
                </td>
                <td className="px-3 py-1.5">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider ${
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
                <td className="px-3 py-1.5 text-white/60 whitespace-nowrap">
                  {new Date(p.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-white/50"
                >
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-3 text-xs text-white/60">
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-1">
            <PageLink
              href={pageHref(Math.max(1, currentPage - 1))}
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
                  href={pageHref(n)}
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
              href={pageHref(Math.min(totalPages, currentPage + 1))}
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
