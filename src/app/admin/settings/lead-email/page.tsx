import { db } from "@/db";
import { settings } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { LEAD_EMAIL_DEFAULTS, getLeadEmailConfig } from "@/lib/site-settings";
import { LEAD_EMAIL_VARIABLES } from "@/lib/email";
import { SavedToast } from "@/app/admin/_components/SavedToast";

const KEYS = {
  to: "lead_notification_email",
  cc: "lead_notification_cc",
  subject: "lead_email_subject",
  body: "lead_email_body",
} as const;

async function upsert(key: string, value: string) {
  await db
    .insert(settings)
    .values({ key, value: value as unknown as object })
    .onConflictDoUpdate({
      target: settings.key,
      set: { value: value as unknown as object, updatedAt: new Date() },
    });
}

export default async function LeadEmailSettingsPage() {
  const cfg = await getLeadEmailConfig();

  async function save(formData: FormData) {
    "use server";
    await upsert(KEYS.to, String(formData.get("to") ?? "").trim());
    await upsert(KEYS.cc, String(formData.get("cc") ?? "").trim());
    await upsert(KEYS.subject, String(formData.get("subject") ?? "").trim());
    await upsert(KEYS.body, String(formData.get("body") ?? ""));
    revalidatePath("/admin/settings/lead-email");
    redirect("/admin/settings/lead-email?saved=1");
  }

  async function resetDefaults() {
    "use server";
    await upsert(KEYS.to, LEAD_EMAIL_DEFAULTS.to);
    await upsert(KEYS.cc, LEAD_EMAIL_DEFAULTS.cc);
    await upsert(KEYS.subject, LEAD_EMAIL_DEFAULTS.subject);
    await upsert(KEYS.body, LEAD_EMAIL_DEFAULTS.body);
    revalidatePath("/admin/settings/lead-email");
    redirect("/admin/settings/lead-email?saved=1");
  }

  return (
    <div>
      <SavedToast />
      <div className="mb-6">
        <h2 className="font-display text-xl font-bold">Lead Notification Email</h2>
        <p className="text-sm text-(--color-muted) mt-1">
          Configure the email sent to your team when someone submits the contact / quotation form.
        </p>
      </div>

      <div className="glass p-6 mb-6">
        <div className="kicker mb-3">Available variables</div>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          {LEAD_EMAIL_VARIABLES.map((v) => (
            <div key={v.token} className="flex items-baseline gap-2">
              <code className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-(--color-cyan) text-xs">
                {v.token}
              </code>
              <span className="text-(--color-muted)">{v.description}</span>
            </div>
          ))}
        </div>
      </div>

      <form action={save} className="glass p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-x-5 gap-y-5">
          <div>
            <label className="kicker block mb-2">To (recipient)</label>
            <input
              name="to"
              type="email"
              required
              defaultValue={cfg.to}
              className="w-full px-4 py-3 bg-white/3 border border-white/10 rounded-lg focus:outline-none focus:border-(--color-cyan) focus:ring-2 focus:ring-(--color-cyan)/20 transition"
            />
          </div>
          <div>
            <label className="kicker block mb-2">CC (comma-separated)</label>
            <input
              name="cc"
              type="text"
              defaultValue={cfg.cc}
              placeholder="alice@example.com, bob@example.com"
              className="w-full px-4 py-3 bg-white/3 border border-white/10 rounded-lg focus:outline-none focus:border-(--color-cyan) focus:ring-2 focus:ring-(--color-cyan)/20 transition"
            />
          </div>
          <div className="md:col-span-2">
            <label className="kicker block mb-2">Subject</label>
            <input
              name="subject"
              type="text"
              required
              defaultValue={cfg.subject}
              className="w-full px-4 py-3 bg-white/3 border border-white/10 rounded-lg font-mono text-sm focus:outline-none focus:border-(--color-cyan) focus:ring-2 focus:ring-(--color-cyan)/20 transition"
            />
          </div>
          <div className="md:col-span-2">
            <label className="kicker block mb-2">Body (HTML supported)</label>
            <textarea
              name="body"
              required
              rows={14}
              defaultValue={cfg.body}
              className="w-full px-4 py-3 bg-white/3 border border-white/10 rounded-lg font-mono text-xs focus:outline-none focus:border-(--color-cyan) focus:ring-2 focus:ring-(--color-cyan)/20 transition"
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
          <button
            type="submit"
            formAction={resetDefaults}
            className="px-4 py-2 text-sm border border-white/10 rounded-lg hover:bg-white/5 transition"
          >
            Reset to default
          </button>
          <button className="btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
}
