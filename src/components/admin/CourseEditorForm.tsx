"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FUNDING_OPTIONS, fundingColor } from "@/lib/funding";

export type CourseModuleData = {
  title: string;
  kind: string; // "" | "foundation" | "elective"
  details: string;
  sessions: string;
  duration: string;
  registrationLink: string;
};

export type CourseFormData = {
  id: number;
  title: string;
  slug: string;
  courseCode: string;
  status: "draft" | "published" | "archived";
  summary: string;
  certificate: string;
  overview: string;
  outcomes: string;
  whoShouldEnroll: string;
  assessment: string;
  priceExclGst: string;
  priceInclGst: string;
  fundingTags: string[];
  brochureUrl: string;
  heroImage: string;
  seoTitle: string;
  seoDescription: string;
  modules: CourseModuleData[];
};

export function emptyModule(): CourseModuleData {
  return {
    title: "",
    kind: "",
    details: "",
    sessions: "",
    duration: "",
    registrationLink: "",
  };
}

type Props = {
  initial: CourseFormData;
  save: (data: CourseFormData) => Promise<{ slug: string }>;
};

const inputCls =
  "w-full px-3 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-(--color-cyan) text-sm";
const labelCls = "text-xs uppercase tracking-wide text-white/50";

export function CourseEditorForm({ initial, save }: Props) {
  const router = useRouter();
  const [data, setData] = useState<CourseFormData>(initial);
  const [pending, startTransition] = useTransition();
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  function update<K extends keyof CourseFormData>(key: K, value: CourseFormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function updateModule(i: number, patch: Partial<CourseModuleData>) {
    setData((d) => ({
      ...d,
      modules: d.modules.map((m, idx) => (idx === i ? { ...m, ...patch } : m)),
    }));
  }

  function addModule() {
    setData((d) => ({ ...d, modules: [...d.modules, emptyModule()] }));
  }

  function removeModule(i: number) {
    setData((d) => ({ ...d, modules: d.modules.filter((_, idx) => idx !== i) }));
  }

  function moveModule(i: number, dir: -1 | 1) {
    setData((d) => {
      const next = [...d.modules];
      const j = i + dir;
      if (j < 0 || j >= next.length) return d;
      [next[i], next[j]] = [next[j], next[i]];
      return { ...d, modules: next };
    });
  }

  function toggleFunding(tag: string) {
    setData((d) => ({
      ...d,
      fundingTags: d.fundingTags.includes(tag)
        ? d.fundingTags.filter((t) => t !== tag)
        : [...d.fundingTags, tag],
    }));
  }

  function submit() {
    startTransition(async () => {
      const res = await save(data);
      setSavedAt(new Date());
      // Slug may have been normalised/changed server-side — keep the URL in sync
      // and reflect the freshly-saved data.
      if (res?.slug) {
        if (res.slug !== data.slug) {
          setData((d) => ({ ...d, slug: res.slug }));
          router.replace(`/admin/courses/${res.slug}/edit`);
        } else {
          router.refresh();
        }
      }
    });
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Main column */}
      <div className="lg:col-span-2 space-y-4">
        <div>
          <label className={labelCls}>Course title</label>
          <input
            value={data.title}
            onChange={(e) => update("title", e.target.value)}
            className="w-full px-3 py-2 text-2xl font-bold bg-white/5 border border-white/10 rounded focus:outline-none focus:border-(--color-cyan)"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Slug</label>
            <input
              value={data.slug}
              onChange={(e) => update("slug", e.target.value)}
              className={`${inputCls} font-mono`}
            />
          </div>
          <div>
            <label className={labelCls}>Course code</label>
            <input
              value={data.courseCode}
              onChange={(e) => update("courseCode", e.target.value)}
              placeholder="TGS-2025060519"
              className={`${inputCls} font-mono`}
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Summary (shown on listing cards)</label>
          <textarea
            value={data.summary}
            onChange={(e) => update("summary", e.target.value)}
            rows={2}
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Course overview — “What’s This Course About”</label>
          <textarea
            value={data.overview}
            onChange={(e) => update("overview", e.target.value)}
            rows={8}
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Program outcomes (one per line)</label>
          <textarea
            value={data.outcomes}
            onChange={(e) => update("outcomes", e.target.value)}
            rows={5}
            placeholder={"Develop a solid foundation in IT support…\nAcquire job-ready cybersecurity skills…"}
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Who should enroll (one per line)</label>
          <textarea
            value={data.whoShouldEnroll}
            onChange={(e) => update("whoShouldEnroll", e.target.value)}
            rows={4}
            placeholder={"Aspiring cybersecurity professionals\nCareer switchers…"}
            className={inputCls}
          />
        </div>

        {/* Modules */}
        <div className="glass rounded-xl p-4 space-y-4 border border-(--color-cyan)/20">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Modules</h3>
            <button
              type="button"
              onClick={addModule}
              className="px-3 py-1.5 text-xs rounded bg-(--color-cyan)/20 border border-(--color-cyan)/40 hover:bg-(--color-cyan)/30"
            >
              + Add module
            </button>
          </div>

          {data.modules.length === 0 && (
            <p className="text-sm text-white/40">No modules yet. Click “+ Add module”.</p>
          )}

          {data.modules.map((m, i) => (
            <div
              key={i}
              className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-white/40">Module {i + 1}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveModule(i, -1)}
                    disabled={i === 0}
                    className="px-2 py-1 rounded border border-white/10 hover:bg-white/10 text-xs disabled:opacity-30"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveModule(i, 1)}
                    disabled={i === data.modules.length - 1}
                    className="px-2 py-1 rounded border border-white/10 hover:bg-white/10 text-xs disabled:opacity-30"
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => removeModule(i)}
                    className="px-2 py-1 rounded border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs"
                    title="Remove module"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-[1fr_auto] gap-3">
                <div>
                  <label className={labelCls}>Module title</label>
                  <input
                    value={m.title}
                    onChange={(e) => updateModule(i, { title: e.target.value })}
                    placeholder="CompTIA Security+"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Type</label>
                  <select
                    value={m.kind}
                    onChange={(e) => updateModule(i, { kind: e.target.value })}
                    className={inputCls}
                  >
                    <option value="" className="bg-(--color-bg-elevated) text-white">
                      —
                    </option>
                    <option value="foundation" className="bg-(--color-bg-elevated) text-white">
                      Foundation
                    </option>
                    <option value="elective" className="bg-(--color-bg-elevated) text-white">
                      Elective
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelCls}>Details</label>
                <textarea
                  value={m.details}
                  onChange={(e) => updateModule(i, { details: e.target.value })}
                  rows={3}
                  className={inputCls}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Sessions</label>
                  <input
                    value={m.sessions}
                    onChange={(e) => updateModule(i, { sessions: e.target.value })}
                    placeholder="3 sessions"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Duration</label>
                  <input
                    value={m.duration}
                    onChange={(e) => updateModule(i, { duration: e.target.value })}
                    placeholder="16 hours / 2 days"
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Registration link (optional)</label>
                <input
                  value={m.registrationLink}
                  onChange={(e) => updateModule(i, { registrationLink: e.target.value })}
                  placeholder="https://…"
                  className={`${inputCls} font-mono`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <aside className="space-y-4">
        <div className="glass rounded-xl p-4 space-y-3">
          <h3 className="font-bold">Publish</h3>
          <label className="block">
            <span className="text-xs text-white/60">Status</span>
            <select
              value={data.status}
              onChange={(e) =>
                update("status", e.target.value as CourseFormData["status"])
              }
              className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded"
            >
              <option value="draft" className="bg-(--color-bg-elevated) text-white">
                Draft
              </option>
              <option value="published" className="bg-(--color-bg-elevated) text-white">
                Published
              </option>
              <option value="archived" className="bg-(--color-bg-elevated) text-white">
                Archived
              </option>
            </select>
          </label>
          <button
            onClick={submit}
            disabled={pending}
            className="w-full py-2 rounded bg-gradient-to-r from-neon-blue to-neon-cyan font-semibold disabled:opacity-50"
          >
            {pending ? "Saving…" : "Save"}
          </button>
          {savedAt && (
            <p className="text-xs text-neon-cyan">Saved {savedAt.toLocaleTimeString()}</p>
          )}
        </div>

        <div className="glass rounded-xl p-4 space-y-3">
          <h3 className="font-bold text-sm">Pricing & funding</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Fee (excl. GST)</label>
              <input
                value={data.priceExclGst}
                onChange={(e) => update("priceExclGst", e.target.value)}
                placeholder="$9,000.00"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Fee (incl. GST)</label>
              <input
                value={data.priceInclGst}
                onChange={(e) => update("priceInclGst", e.target.value)}
                placeholder="$9,810.00"
                className={inputCls}
              />
            </div>
          </div>
          <div>
            <label className={labelCls}>Assessment</label>
            <input
              value={data.assessment}
              onChange={(e) => update("assessment", e.target.value)}
              placeholder="Written Exam, Practical Exam (2 hrs)"
              className={inputCls}
            />
          </div>
          <div>
            <span className={labelCls}>Funding schemes</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {FUNDING_OPTIONS.map((tag) => {
                const on = data.fundingTags.includes(tag);
                const color = fundingColor(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => toggleFunding(tag)}
                    style={
                      on
                        ? { backgroundColor: color, borderColor: color, color: "#fff" }
                        : { borderColor: color, color }
                    }
                    className="px-2.5 py-1 rounded-full text-xs font-medium border transition hover:opacity-90"
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label className={labelCls}>Brochure URL (optional)</label>
            <input
              value={data.brochureUrl}
              onChange={(e) => update("brochureUrl", e.target.value)}
              placeholder="https://…"
              className={`${inputCls} font-mono`}
            />
          </div>
        </div>

        <div className="glass rounded-xl p-4 space-y-3">
          <h3 className="font-bold text-sm">Certificate</h3>
          <textarea
            value={data.certificate}
            onChange={(e) => update("certificate", e.target.value)}
            rows={4}
            placeholder="Certificate of Completion from Tertiary Infotech…"
            className={inputCls}
          />
        </div>

        <div className="glass rounded-xl p-4 space-y-3">
          <h3 className="font-bold text-sm">SEO</h3>
          <div>
            <label className={labelCls}>SEO title</label>
            <input
              value={data.seoTitle}
              onChange={(e) => update("seoTitle", e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Meta description</label>
            <textarea
              value={data.seoDescription}
              onChange={(e) => update("seoDescription", e.target.value)}
              rows={3}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Hero image URL (optional)</label>
            <input
              value={data.heroImage}
              onChange={(e) => update("heroImage", e.target.value)}
              placeholder="/images/hero-classroom.png"
              className={inputCls}
            />
          </div>
        </div>
      </aside>
    </div>
  );
}
