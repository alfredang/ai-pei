import { db } from "@/db";
import { affiliates, affiliateReferrals } from "@/db/schema";
import { desc, eq, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { ensureAffiliateTables, REFERRAL_STATUSES } from "@/lib/ensure-affiliate-tables";

export const dynamic = "force-dynamic";

export default async function ReferralsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  await ensureAffiliateTables();

  // ?affiliate=<id> filters to one affiliate; ?affiliate=none shows direct/unmatched.
  const filter = Array.isArray(params.affiliate) ? params.affiliate[0] : params.affiliate;
  const where =
    filter === "none"
      ? isNull(affiliateReferrals.affiliateId)
      : filter && Number(filter)
        ? eq(affiliateReferrals.affiliateId, Number(filter))
        : undefined;

  const [rows, allAffiliates] = await Promise.all([
    db
      .select({ r: affiliateReferrals, affiliateName: affiliates.name })
      .from(affiliateReferrals)
      .leftJoin(affiliates, eq(affiliates.id, affiliateReferrals.affiliateId))
      .where(where)
      .orderBy(desc(affiliateReferrals.createdAt)),
    db.select({ id: affiliates.id, name: affiliates.name }).from(affiliates).orderBy(affiliates.name),
  ]);

  async function setStatus(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));
    const status = String(formData.get("status") ?? "");
    if (!id || !REFERRAL_STATUSES.some((s) => s.value === status)) return;
    await db.update(affiliateReferrals).set({ status }).where(eq(affiliateReferrals.id, id));
    revalidatePath("/admin/affiliates/referrals");
    revalidatePath("/admin/affiliates");
  }

  const tab = (href: string, label: string, active: boolean) => (
    <Link
      key={href}
      href={href}
      className={`px-3 py-1 rounded-full text-xs border ${
        active ? "border-(--color-cyan) text-(--color-cyan)" : "border-white/10 text-white/60 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Student Applications</h1>
        <div className="flex items-center gap-4">
          <Link href="/admin/affiliates" className="text-sm text-(--color-cyan) hover:underline">
            ← Affiliates
          </Link>
          <span className="text-sm text-white/50 font-mono">[ {rows.length} shown ]</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tab("/admin/affiliates/referrals", "All", !filter)}
        {allAffiliates.map((a) =>
          tab(`/admin/affiliates/referrals?affiliate=${a.id}`, a.name, filter === String(a.id)),
        )}
        {tab("/admin/affiliates/referrals?affiliate=none", "Direct / unmatched", filter === "none")}
      </div>

      <section className="glass rounded-xl p-6 overflow-x-auto">
        {rows.length === 0 ? (
          <p className="text-sm text-white/40">No applications yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-left text-[11px] uppercase text-white/60">
              <tr>
                <th className="px-2 py-2">Received</th>
                <th className="px-2 py-2">Student</th>
                <th className="px-2 py-2">Nationality</th>
                <th className="px-2 py-2">Programme</th>
                <th className="px-2 py-2">Preferred start</th>
                <th className="px-2 py-2">Mode</th>
                <th className="px-2 py-2">Affiliate</th>
                <th className="px-2 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ r, affiliateName }) => (
                <tr key={r.id} className="border-t border-white/5 hover:bg-white/5 align-top">
                  <td className="px-2 py-2 text-xs font-mono text-white/50 whitespace-nowrap">
                    {new Date(r.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-2 py-2">
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-white/60">
                      <a href={`mailto:${r.email}`} className="hover:underline">{r.email}</a> · {r.phone}
                    </div>
                    {r.message && <div className="text-xs text-white/40 mt-1 whitespace-pre-wrap">{r.message}</div>}
                  </td>
                  <td className="px-2 py-2">{r.nationality}</td>
                  <td className="px-2 py-2">{r.program}</td>
                  <td className="px-2 py-2 whitespace-nowrap">{r.preferredStart}</td>
                  <td className="px-2 py-2">{r.mode ?? "—"}</td>
                  <td className="px-2 py-2 text-xs">
                    {affiliateName ?? (r.affiliateCode ? `Unknown "${r.affiliateCode}"` : "Direct")}
                  </td>
                  <td className="px-2 py-2">
                    <form action={setStatus} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={r.id} />
                      <select
                        name="status"
                        defaultValue={r.status}
                        className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs"
                      >
                        {REFERRAL_STATUSES.map((s) => (
                          <option key={s.value} value={s.value} className="bg-(--color-bg-elevated)">
                            {s.label}
                          </option>
                        ))}
                      </select>
                      <button className="text-xs text-(--color-cyan) hover:underline">Save</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
