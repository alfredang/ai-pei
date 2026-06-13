"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";

const WA_NUMBER = "6588666375";

/** Quick-query helpers — each opens WhatsApp with a pre-filled message. */
const QUERIES: { label: string; text: string }[] = [
  {
    label: "💬 Course info & brochure",
    text: "Hi Tertiary Infotech Academy! I'd like more information and a brochure for your Advanced Certificate courses.",
  },
  {
    label: "💰 Fees for international students",
    text: "Hi! What are the course fees and payment options for international students?",
  },
  {
    label: "📋 Entry requirements",
    text: "Hi! What are the entry requirements for the Advanced Certificate courses?",
  },
  {
    label: "🛂 Student Pass & relocation",
    text: "Hi! Can you help me with Student Pass / visa and relocation guidance for studying in Singapore?",
  },
  {
    label: "🗓️ Next intake dates",
    text: "Hi! When is the next intake, and how do I apply?",
  },
];

function waLink(text: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function WhatsAppWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Customer-facing only — never render inside the admin area.
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {/* Helper panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[min(92vw,360px)] glass rounded-2xl overflow-hidden border border-white/15 shadow-2xl animate-[fadeIn_.18s_ease-out]"
          role="dialog"
          aria-label="WhatsApp quick help"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 bg-[#25D366]/15 border-b border-white/10">
            <span className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
              <FaWhatsapp className="w-6 h-6 text-white" />
            </span>
            <div className="min-w-0">
              <div className="font-display font-bold text-white leading-tight">Chat with us</div>
              <div className="text-xs text-(--color-muted)">Typically replies within 1 business day</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="ml-auto text-white/60 hover:text-white transition"
            >
              <HiXMark className="w-5 h-5" />
            </button>
          </div>

          {/* Quick queries */}
          <div className="p-4 space-y-2">
            <p className="text-xs text-(--color-muted) mb-1">Pick a question to start on WhatsApp:</p>
            {QUERIES.map((q) => (
              <a
                key={q.label}
                href={waLink(q.text)}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-white/90 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#25D366]/60 hover:bg-[#25D366]/10 transition"
              >
                {q.label}
              </a>
            ))}
            <a
              href={waLink("Hi Tertiary Infotech Academy! I have a question about studying in Singapore.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-[#25D366] text-white font-semibold hover:bg-[#1ebe5b] transition"
            >
              <FaWhatsapp className="w-5 h-5" />
              Open WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close WhatsApp help" : "Chat on WhatsApp"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-[0_8px_30px_-4px_rgba(37,211,102,0.6)] flex items-center justify-center hover:scale-105 transition"
      >
        {open ? <HiXMark className="w-7 h-7 text-white" /> : <FaWhatsapp className="w-7 h-7 text-white" />}
      </button>
    </>
  );
}
