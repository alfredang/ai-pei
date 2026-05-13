import { db } from "@/db";
import { settings } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function SettingsAdmin() {
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
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <form action={save} className="glass rounded-xl p-6 space-y-4 max-w-2xl">
        <Field name="site_title" label="Site title" defaultValue={String(map.get("site_title") ?? "")} />
        <Field name="tagline" label="Tagline" defaultValue={String(map.get("tagline") ?? "")} />
        <Field
          name="contact_email"
          label="Lead notification email"
          defaultValue={String(map.get("contact_email") ?? "")}
        />
        <button className="px-5 py-2 rounded bg-gradient-to-r from-neon-blue to-neon-cyan font-semibold">
          Save settings
        </button>
      </form>
      <div className="mt-8 max-w-2xl">
        <h2 className="font-bold mb-2">AI Assist status</h2>
        <p className="text-sm text-white/70">
          Claude Agent SDK is{" "}
          {process.env.ANTHROPIC_AUTH_TOKEN ? (
            <span className="text-neon-cyan">configured</span>
          ) : (
            <span className="text-red-400">not configured</span>
          )}
          . Set <code>ANTHROPIC_AUTH_TOKEN</code> in the environment to enable.
        </p>
      </div>
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
      <span className="text-xs text-white/60">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded"
      />
    </label>
  );
}
