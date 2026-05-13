import { db } from "@/db";
import { leads } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function LeadsList() {
  const list = await db.select().from(leads).orderBy(desc(leads.createdAt));
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Leads</h1>
      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-left text-xs uppercase text-white/60">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {list.map((l) => (
              <tr key={l.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="px-4 py-3">{l.name}</td>
                <td className="px-4 py-3">
                  <a href={`mailto:${l.email}`} className="text-neon-cyan hover:underline">
                    {l.email}
                  </a>
                </td>
                <td className="px-4 py-3 text-white/70">{l.company ?? "—"}</td>
                <td className="px-4 py-3 text-white/70">{l.source ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded text-xs bg-white/10">{l.status}</span>
                </td>
                <td className="px-4 py-3 text-white/60">
                  {new Date(l.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-white/50">
                  No leads yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
