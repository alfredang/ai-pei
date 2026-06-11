"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * "← Back" button for the course editor. Shows a confirmation before leaving so
 * unsaved work isn't lost. Navigating away never creates or deletes anything —
 * a course only exists once it's been explicitly saved.
 */
export function CourseBackButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition"
      >
        ← Back
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="glass rounded-xl p-6 max-w-sm w-full text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display font-bold text-lg mb-2">Leave this page?</h3>
            <p className="text-sm text-white/60 mb-6">
              Any unsaved changes will be lost. Save first if you want to keep them.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded border border-white/10 text-sm hover:bg-white/5"
              >
                Stay
              </button>
              <button
                type="button"
                onClick={() => router.push("/admin/courses")}
                className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-white text-sm font-medium"
              >
                Leave without saving
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
