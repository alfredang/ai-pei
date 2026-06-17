import Link from "next/link";
import { db } from "@/db";
import { pages, posts, leads, tags, postTags } from "@/db/schema";
import { count, desc, eq, sql } from "drizzle-orm";
import { htmlPath } from "@/lib/html-url";

export const dynamic = "force-dynamic";

function shortDate(d: Date | string) {
  const dt = typeof d === "string" ? new Date(d) : d;
  return dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" });
}

export default async function AdminDashboard() {
  const [
    [pagesCount],
    [postsCount],
    [leadsCount],
    [newLeadsCount],
    popularTags,
    latestPosts,
    latestLeads,
  ] = await Promise.all([
    db.select({ c: count() }).from(pages),
    db.select({ c: count() }).from(posts),
    db.select({ c: count() }).from(leads),
    db.select({ c: count() }).from(leads).where(eq(leads.status, "new")),
    db
      .select({
        id: tags.id,
        name: tags.name,
        slug: tags.slug,
        c: sql<number>`count(${postTags.postId})::int`,
      })
      .from(tags)
      .leftJoin(postTags, eq(postTags.tagId, tags.id))
      .groupBy(tags.id)
      .orderBy(sql`count(${postTags.postId}) desc`, tags.name)
      .limit(10),
    db
      .select({
        id: posts.id,
        slug: posts.slug,
        title: posts.title,
        publishedAt: posts.publishedAt,
        status: posts.status,
      })
      .from(posts)
      .where(eq(posts.status, "published"))
      .orderBy(desc(posts.publishedAt))
      .limit(5),
    db
      .select({
        id: leads.id,
        name: leads.name,
        email: leads.email,
        company: leads.company,
        source: leads.source,
        status: leads.status,
        createdAt: leads.createdAt,
      })
      .from(leads)
      .orderBy(desc(leads.createdAt))
      .limit(5),
  ]);

  const stats = [
    { label: "Pages", value: pagesCount.c, href: "/admin/pages" },
    { label: "Posts", value: postsCount.c, href: "/admin/posts" },
    { label: "Leads", value: leadsCount.c, href: "/admin/leads" },
    { label: "New leads", value: newLeadsCount.c, href: "/admin/leads" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="glass rounded-xl p-6 hover:border-(--color-cyan)/40 transition block"
          >
            <div className="text-sm text-white/60">{s.label}</div>
            <div className="text-3xl font-bold mt-2">{s.value}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <section className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold">10 Most Popular Tags</h2>
            <Link href="/admin/tags" className="text-xs text-(--color-cyan) hover:underline">
              Manage →
            </Link>
          </div>
          {popularTags.length === 0 ? (
            <p className="text-sm text-white/40">No tags yet.</p>
          ) : (
            <ul className="space-y-1.5">
              {popularTags.map((t, i) => (
                <li key={t.id} className="flex items-center gap-3 text-sm">
                  <span className="w-5 text-right text-xs font-mono text-white/30">{i + 1}.</span>
                  <Link
                    href={htmlPath(`/blog?tag=${encodeURIComponent(t.slug)}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 truncate hover:text-(--color-cyan) transition"
                  >
                    #{t.name}
                  </Link>
                  <span className="text-xs font-mono text-(--color-cyan)/80">{t.c}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold">5 Latest Blog Posts</h2>
            <Link href="/admin/posts" className="text-xs text-(--color-cyan) hover:underline">
              Manage →
            </Link>
          </div>
          {latestPosts.length === 0 ? (
            <p className="text-sm text-white/40">No posts yet.</p>
          ) : (
            <ul className="space-y-2.5">
              {latestPosts.map((p) => (
                <li key={p.id} className="text-sm">
                  <Link
                    href={`/admin/posts/${p.id}/edit`}
                    className="hover:text-(--color-cyan) transition line-clamp-2 leading-snug"
                  >
                    {p.title}
                  </Link>
                  <div className="text-[11px] font-mono text-white/40 mt-0.5">
                    {p.publishedAt ? shortDate(p.publishedAt) : "—"} · /{p.slug}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold">5 Latest Leads</h2>
            <Link href="/admin/leads" className="text-xs text-(--color-cyan) hover:underline">
              Manage →
            </Link>
          </div>
          {latestLeads.length === 0 ? (
            <p className="text-sm text-white/40">No leads yet.</p>
          ) : (
            <ul className="space-y-2.5">
              {latestLeads.map((l) => (
                <li key={l.id} className="text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium truncate">{l.name}</span>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border border-(--color-cyan)/30 bg-(--color-cyan)/10 text-(--color-cyan)">
                      {l.status}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-white/40 mt-0.5 truncate">
                    {l.email} {l.source ? `· ${l.source}` : ""} · {shortDate(l.createdAt)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="glass rounded-xl p-6 opacity-70">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold">Top 5 Most Popular Posts</h2>
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border border-(--color-amber)/30 bg-(--color-amber)/10 text-(--color-amber)">
              soon
            </span>
          </div>
          <p className="text-sm text-white/50">
            Requires view-count tracking on the blog routes — queued, ships in the next bundle.
          </p>
        </section>

        <section className="glass rounded-xl p-6 opacity-70 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold">Top 5 Highest-Score Leads</h2>
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border border-(--color-amber)/30 bg-(--color-amber)/10 text-(--color-amber)">
              soon
            </span>
          </div>
          <p className="text-sm text-white/50">
            Requires the lead-scoring algorithm (message length + keenness signals) wired into{" "}
            <code className="font-mono text-xs">/api/contact</code> plus a backfill across existing
            leads. Coming in the next bundle.
          </p>
        </section>
      </div>
    </div>
  );
}
