import { db } from "@/db";
import { settings } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function SettingsGeneral() {
  const all = await db.select().from(settings);
  const map = new Map(all.map((s) => [s.key, s.value]));

  async function save(formData: FormData) {
    "use server";
    const entries: Array<[string, unknown]> = [
      ["site_title", formData.get("site_title")],
      ["tagline", formData.get("tagline")],
      ["contact_email", formData.get("contact_email")],
    ];
    for (const [key, value] of entries) {
      await db
        .insert(settings)
        .values({ key, value: (value as string) ?? "" })
        .onConflictDoUpdate({
          target: settings.key,
          set: { value: (value as string) ?? "", updatedAt: new Date() },
        });
    }
    revalidatePath("/");
    revalidatePath("/admin/settings");
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-xl font-bold">General</h2>
        <p className="text-sm text-(--color-muted) mt-1">
          Site identity and contact details. Used on the public site and lead notifications.
        </p>
      </div>
      <form action={save} className="glass p-6 space-y-5">
        <Field name="site_title" label="Site title" defaultValue={String(map.get("site_title") ?? "")} />
        <Field name="tagline" label="Tagline" defaultValue={String(map.get("tagline") ?? "")} />
        <Field
          name="contact_email"
          label="Lead notification email"
          defaultValue={String(map.get("contact_email") ?? "")}
        />
        <div className="pt-2">
          <button className="btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
}

function Field({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue: string;
}) {
  return (
    <label className="block">
      <span className="kicker block mb-2">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        className="w-full px-4 py-3 bg-white/3 border border-white/10 rounded-lg focus:outline-none focus:border-(--color-cyan) focus:ring-2 focus:ring-(--color-cyan)/20 transition"
      />
    </label>
  );
}
