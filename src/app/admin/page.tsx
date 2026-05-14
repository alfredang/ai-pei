import { db } from "@/db";
import { pages, posts, leads } from "@/db/schema";
import { count, eq } from "drizzle-orm";

// Auth is enforced by middleware (cookie presence) + admin/layout.tsx
// (session-cookie verification + email lookup). This page trusts that
// gating and never redirects on its own.
export default async function AdminDashboard() {
  const [[pagesCount], [postsCount], [leadsCount], [newLeadsCount]] =
    await Promise.all([
      db.select({ c: count() }).from(pages),
      db.select({ c: count() }).from(posts),
      db.select({ c: count() }).from(leads),
      db.select({ c: count() }).from(leads).where(eq(leads.status, "new")),
    ]);

  const stats = [
    { label: "Pages", value: pagesCount.c },
    { label: "Posts", value: postsCount.c },
    { label: "Leads", value: leadsCount.c },
    { label: "New leads", value: newLeadsCount.c },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-xl p-6">
            <div className="text-sm text-white/60">{s.label}</div>
            <div className="text-3xl font-bold mt-2">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
