"use client";

import { useState, useTransition } from "react";

/**
 * Delete button with a confirmation modal. `onConfirm` is a server action
 * (bound to the course id) passed from the list page.
 */
export function DeleteCourseButton({
  title,
  onConfirm,
}: {
  title: string;
  onConfirm: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function confirmDelete() {
    startTransition(async () => {
      await onConfirm();
      setOpen(false);
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-3 py-1 rounded border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs"
      >
        Delete
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => !pending && setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="glass rounded-xl p-6 max-w-sm w-full text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display font-bold text-lg mb-2">Delete course?</h3>
            <p className="text-sm text-white/60 mb-6">
              This will permanently delete{" "}
              <span className="text-white font-medium">&ldquo;{title}&rdquo;</span> and all of
              its modules. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                disabled={pending}
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded border border-white/10 text-sm hover:bg-white/5 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-500/80 hover:bg-red-500 text-white text-sm font-medium disabled:opacity-50"
              >
                {pending ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
