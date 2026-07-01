"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";

const PHONE = "6588666375";
const PREFILL = "Hi Tertiary Infotech Academy, I'd like to know more about your Advanced Certificate courses.";
const WA_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(PREFILL)}`;

export function WhatsAppWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Customer-facing widget — never render on /admin pages.
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="glass w-[min(88vw,300px)] rounded-2xl border border-white/15 overflow-hidden shadow-[var(--shadow-glow-blue-lg)]">
          <header className="flex items-center gap-3 bg-[#25D366] px-4 py-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <FaWhatsapp className="h-6 w-6 text-white" />
            </span>
            <div className="leading-tight">
              <p className="font-bold text-white">Course Assistant</p>
              <p className="text-xs text-white/90">Ask about any course</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="ml-auto text-white/80 hover:text-white transition"
            >
              <HiXMark className="h-5 w-5" />
            </button>
          </header>
          <div className="p-4 space-y-3 text-sm">
            <div className="rounded-2xl bg-white/5 border border-white/10 px-3 py-2 text-white/80">
              Hi there! 👋 Chat with us on WhatsApp about our Advanced Certificate courses in AI, Cyber Security & Blockchain.
            </div>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 font-semibold text-white hover:bg-[#1ebe57] transition"
            >
              <FaWhatsapp className="h-5 w-5" />
              Start Chat
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close WhatsApp chat" : "Chat on WhatsApp"}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[var(--shadow-glow-blue-lg)] hover:scale-105 transition"
      >
        {!open && (
          <span className="wa-pulse pointer-events-none absolute inset-0 rounded-full border-2 border-[#25D366]" />
        )}
        {open ? (
          <HiXMark className="relative h-6 w-6 text-white" />
        ) : (
          <FaWhatsapp className="relative h-7 w-7 text-white" />
        )}
      </button>
    </div>
  );
}
