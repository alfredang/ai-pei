import { db } from "@/db";
import { settings } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SavedToast } from "@/app/admin/_components/SavedToast";
import { HOMEPAGE_COPY_DEFAULTS } from "@/lib/site-settings";

type Field = {
  key: string;
  label: string;
  hint?: string;
  multiline?: boolean;
  defaultValue: string;
  group: "hero" | "services" | "why-us";
};

const FIELDS: Field[] = [
  { group: "hero", key: "hero_kicker", label: "Hero kicker", defaultValue: HOMEPAGE_COPY_DEFAULTS.heroKicker },
  {
    group: "hero",
    key: "hero_headline_html",
    label: "Hero headline (HTML)",
    multiline: true,
    hint: "HTML is allowed — use <span class=\"gradient-text\">…</span> for accent words.",
    defaultValue: HOMEPAGE_COPY_DEFAULTS.heroHeadlineHtml,
  },
  {
    group: "hero",
    key: "hero_subhead_html",
    label: "Hero subhead (HTML)",
    multiline: true,
    defaultValue: HOMEPAGE_COPY_DEFAULTS.heroSubheadHtml,
  },
  { group: "hero", key: "hero_cta_primary_label", label: "Primary CTA label", defaultValue: HOMEPAGE_COPY_DEFAULTS.heroCtaPrimaryLabel },
  { group: "hero", key: "hero_cta_primary_href", label: "Primary CTA href", defaultValue: HOMEPAGE_COPY_DEFAULTS.heroCtaPrimaryHref },
  { group: "hero", key: "hero_cta_secondary_label", label: "Secondary CTA label", defaultValue: HOMEPAGE_COPY_DEFAULTS.heroCtaSecondaryLabel },
  { group: "hero", key: "hero_cta_secondary_href", label: "Secondary CTA href", defaultValue: HOMEPAGE_COPY_DEFAULTS.heroCtaSecondaryHref },
  { group: "services", key: "services_kicker", label: "Services kicker", defaultValue: HOMEPAGE_COPY_DEFAULTS.servicesKicker },
  {
    group: "services",
    key: "services_headline_html",
    label: "Services headline (HTML)",
    multiline: true,
    defaultValue: HOMEPAGE_COPY_DEFAULTS.servicesHeadlineHtml,
  },
  { group: "why-us", key: "why_us_kicker", label: "Why-us kicker", defaultValue: HOMEPAGE_COPY_DEFAULTS.whyUsKicker },
  {
    group: "why-us",
    key: "why_us_headline_html",
    label: "Why-us headline (HTML)",
    multiline: true,
    defaultValue: HOMEPAGE_COPY_DEFAULTS.whyUsHeadlineHtml,
  },
];

const GROUPS: Array<{ id: Field["group"]; title: string; description: string }> = [
  { id: "hero", title: "Hero section", description: "Top-of-page headline, subhead, and CTAs." },
  { id: "services", title: "Services section", description: "Kicker + heading for the Services grid." },
  { id: "why-us", title: "Why-us section", description: "Kicker + heading for the differentiators band." },
];

export default async function HomepageCopyPage() {
  const rows = await db.select().from(settings);
  const map = new Map(rows.map((s) => [s.key, s.value]));

  async function save(formData: FormData) {
    "use server";
    for (const f of FIELDS) {
      const v = String(formData.get(f.key) ?? "").trim();
      await db
        .insert(settings)
        .values({ key: f.key, value: v as unknown as object })
        .onConflictDoUpdate({
          target: settings.key,
          set: { value: v as unknown as object, updatedAt: new Date() },
        });
    }
    revalidatePath("/admin/settings/homepage");
    revalidatePath("/");
    redirect("/admin/settings/homepage?saved=1");
  }

  return (
    <div>
      <SavedToast />
      <div className="mb-6">
        <h2 className="font-display text-xl font-bold">Homepage copy</h2>
        <p className="text-sm text-(--color-muted) mt-1">
          Hero headline, subheads, kickers and CTAs that appear on the public homepage. HTML is
          allowed in the labelled fields — use it to add accent colors (
          <code className="text-(--color-cyan)">&lt;span class=&quot;gradient-text&quot;&gt;…&lt;/span&gt;</code>
          ). Plain text is also fine.
        </p>
      </div>
      <form action={save} className="space-y-6">
        {GROUPS.map((g) => (
          <div key={g.id} className="glass p-6 space-y-5">
            <div>
              <h3 className="font-display font-bold text-base">{g.title}</h3>
              <p className="text-xs text-(--color-muted) mt-1">{g.description}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-x-5 gap-y-4">
              {FIELDS.filter((f) => f.group === g.id).map((f) => (
                <div key={f.key} className={f.multiline ? "md:col-span-2" : undefined}>
                  <label className="kicker block mb-2">{f.label}</label>
                  {f.multiline ? (
                    <textarea
                      name={f.key}
                      rows={3}
                      defaultValue={String(map.get(f.key) ?? f.defaultValue)}
                      className="w-full px-4 py-3 bg-white/3 border border-white/10 rounded-lg focus:outline-none focus:border-(--color-cyan) focus:ring-2 focus:ring-(--color-cyan)/20 transition font-mono text-sm"
                    />
                  ) : (
                    <input
                      name={f.key}
                      type="text"
                      defaultValue={String(map.get(f.key) ?? f.defaultValue)}
                      className="w-full px-4 py-3 bg-white/3 border border-white/10 rounded-lg focus:outline-none focus:border-(--color-cyan) focus:ring-2 focus:ring-(--color-cyan)/20 transition"
                    />
                  )}
                  {f.hint && <p className="text-[11px] text-(--color-muted) mt-1">{f.hint}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex items-center justify-end pt-4">
          <button className="btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
}
