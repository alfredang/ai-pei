import { db } from "@/db";
import { affiliates, affiliateReferrals } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ensureAffiliateTables } from "@/lib/ensure-affiliate-tables";
import { slugify } from "@/lib/slugify";
import { CopyButton } from "@/components/admin/CopyButton";

export const dynamic = "force-dynamic";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tertiaryinfotech.edu.sg").replace(/\/$/, "");
const linkFor = (code: string) => `${SITE}/apply.html?ref=${encodeURIComponent(code)}`;

export default async function AffiliatesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  await ensureAffiliateTables();

  const rows = await db
    .select({
      id: affiliates.id,
      code: affiliates.code,
      name: affiliates.name,
      email: affiliates.email,
      phone: affiliates.phone,
      country: affiliates.country,
      notes: affiliates.notes,
      active: affiliates.active,
      createdAt: affiliates.createdAt,
      referrals: sql<number>`count(${affiliateReferrals.id})::int`,
      enrolled: sql<number>`count(*) filter (where ${affiliateReferrals.status} = 'enrolled')::int`,
    })
    .from(affiliates)
    .leftJoin(affiliateReferrals, eq(affiliateReferrals.affiliateId, affiliates.id))
    .groupBy(affiliates.id)
    .orderBy(desc(affiliates.createdAt));

  async function add(formData: FormData) {
    "use server";
    await ensureAffiliateTables();
    const name = String(formData.get("name") ?? "").trim();
    const custom = slugify(String(formData.get("code") ?? "")).slice(0, 64);
    if (!name) redirect("/admin/affiliates?err=invalid");
    // Auto codes get a random suffix so they aren't guessable from the name.
    const code =
      custom || `${slugify(name).slice(0, 24) || "aff"}-${Math.random().toString(36).slice(2, 6)}`;
    const opt = (k: string) => String(formData.get(k) ?? "").trim() || null;
    const inserted = await db
      .insert(affiliates)
      .values({
        code,
        name,
        email: opt("email"),
        phone: opt("phone"),
        country: opt("country"),
        notes: opt("notes"),
      })
      .onConflictDoNothing()
      .returning({ id: affiliates.id });
    if (inserted.length === 0) redirect("/admin/affiliates?err=code-taken");
    revalidatePath("/admin/affiliates");
    redirect("/admin/affiliates?saved=1");
  }

  async function toggleActive(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));
    const active = formData.get("active") === "1";
    if (id) await db.update(affiliates).set({ active }).where(eq(affiliates.id, id));
    revalidatePath("/admin/affiliates");
  }

  const err = params.err;

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">Affiliates</h1>
          <Link href="/admin/affiliates/referrals" className="text-sm text-(--color-cyan) hover:underline">
            All student applications →
          </Link>
        </div>
        <p className="text-sm text-white/60 max-w-3xl">
          Each affiliate gets a tracking link to forward to prospective international students.
          Applications submitted through the link are attributed to the affiliate and emailed to
          angch@ (cc tansc@, angss@). Deactivating an affiliate stops new attribution but keeps
          their history.
        </p>
      </div>

      <section className="glass rounded-xl p-6">
        <h2 className="font-display text-lg font-semibold mb-4">Add affiliate</h2>
        {err && (
          <p className="text-sm text-red-400 mb-3">
            {err === "code-taken" ? "That referral code is already in use — pick another." : "Name is required."}
          </p>
        )}
        <form action={add} className="grid md:grid-cols-3 gap-3 items-end">
          <Field name="name" label="Name *" required placeholder="Agent or agency name" />
          <Field name="email" label="Email" type="email" />
          <Field name="phone" label="Phone" />
          <Field name="country" label="Country / market" placeholder="e.g. India" />
          <Field name="code" label="Referral code (optional)" placeholder="auto-generated if blank" mono />
          <Field name="notes" label="Notes" placeholder="Commission terms, etc." />
          <div className="md:col-span-3">
            <button className="btn-primary justify-center">Create affiliate</button>
          </div>
        </form>
      </section>

      <section className="glass rounded-xl p-6">
        <h2 className="font-display text-lg font-semibold mb-4">
          Affiliates <span className="text-xs font-mono text-white/40">({rows.length})</span>
        </h2>
        {rows.length === 0 ? (
          <p className="text-sm text-white/40">No affiliates yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-left text-[11px] uppercase text-white/60">
              <tr>
                <th className="px-2 py-2">Affiliate</th>
                <th className="px-2 py-2">Tracking link</th>
                <th className="px-2 py-2 text-right">Applications</th>
                <th className="px-2 py-2 text-right">Enrolled</th>
                <th className="px-2 py-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className={`border-t border-white/5 hover:bg-white/5 ${r.active ? "" : "opacity-50"}`}>
                  <td className="px-2 py-2 align-top">
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-white/50">
                      {[r.email, r.phone, r.country].filter(Boolean).join(" · ") || "—"}
                    </div>
                    {r.notes && <div className="text-xs text-white/40 mt-1">{r.notes}</div>}
                  </td>
                  <td className="px-2 py-2 align-top">
                    <div className="flex items-center gap-3">
                      <code className="font-mono text-xs text-white/80 break-all">{linkFor(r.code)}</code>
                      <CopyButton text={linkFor(r.code)} />
                    </div>
                  </td>
                  <td className="px-2 py-2 align-top text-right font-mono">
                    <Link href={`/admin/affiliates/referrals?affiliate=${r.id}`} className="text-(--color-cyan) hover:underline">
                      {r.referrals}
                    </Link>
                  </td>
                  <td className="px-2 py-2 align-top text-right font-mono">{r.enrolled}</td>
                  <td className="px-2 py-2 align-top text-right">
                    <form action={toggleActive}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="active" value={r.active ? "0" : "1"} />
                      <button className="text-xs hover:underline">
                        {r.active ? (
                          <span className="text-(--color-green)">Active · deactivate</span>
                        ) : (
                          <span className="text-white/60">Inactive · activate</span>
                        )}
                      </button>
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

function Field({
  name,
  label,
  type = "text",
  placeholder,
  required,
  mono,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  mono?: boolean;
}) {
  return (
    <div>
      <label className="kicker block mb-2">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={`w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm ${mono ? "font-mono" : ""}`}
      />
    </div>
  );
}
