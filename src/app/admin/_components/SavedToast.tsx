"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function SavedToast({ message = "Saved" }: { message?: string }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (params.get("saved") !== "1") return;
    setVisible(true);
    const hideAt = setTimeout(() => setVisible(false), 2500);
    const cleanAt = setTimeout(() => {
      router.replace(pathname, { scroll: false });
    }, 2800);
    return () => {
      clearTimeout(hideAt);
      clearTimeout(cleanAt);
    };
  }, [params, pathname, router]);

  if (!visible) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-6 right-6 z-50 px-4 py-3 rounded-lg border border-emerald-400/40 bg-emerald-500/15 text-emerald-100 shadow-lg backdrop-blur transition"
    >
      ✓ {message}
    </div>
  );
}
