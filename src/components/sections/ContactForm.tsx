"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { TurnstileWidget } from "@/components/forms/TurnstileWidget";

export function ContactForm({
  source = "home",
  heading,
  enquiry = false,
}: {
  /** Lead source tag stored on the submission (e.g. "course-<slug>"). */
  source?: string;
  /** Optional override for the section heading line. */
  heading?: React.ReactNode;
  /** Shorter homepage enquiry; full registration remains available elsewhere. */
  enquiry?: boolean;
} = {}) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [msg, setMsg] = useState<string>("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source, turnstileToken }),
      });
      if (!r.ok) throw new Error(await r.text());
      setState("ok");
      setMsg("Thanks — our staff will get back to you in 3-5 business days.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setState("err");
      setMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="contact" className={`relative py-4 overflow-hidden ${enquiry ? "enquiry-section" : ""}`}>
      <div className="glow-blob" style={{ top: "10%", right: "0", width: 480, height: 480, background: "radial-gradient(circle, #10B981 0%, transparent 70%)" }} />
      <Container className={enquiry ? "enquiry-layout relative" : "max-w-4xl relative"}>
        <div data-theme={enquiry ? "dark" : undefined} className={enquiry ? "enquiry-intro" : "text-center mb-6"}>
          <div className="kicker mb-4">{enquiry ? "[ LET’S TALK · PROGRAMME ENQUIRIES ]" : "[ APPLY NOW ]"}</div>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] mb-4">
            {heading ?? (enquiry ? <>Find your programme.<br /><span className="gradient-text">Take the next step.</span></> : (
              <>
                Apply to Study Tech in <span className="gradient-text">Singapore</span>
              </>
            ))}
          </h2>
          <p className={`text-(--color-muted) text-base max-w-xl ${enquiry ? "" : "mx-auto"}`}>
            {enquiry ? "Ask about programmes, fees and upcoming intakes. Our team replies within 3–5 business days." : <>Tell us your goals and we&apos;ll guide you on programmes, fees and intakes — all live online. International learners welcome — our team replies within 3-5 business days.</>}
          </p>
          {enquiry && <ul className="mt-5 space-y-3 text-sm text-white/85">
            {["Compare programmes and career pathways", "Get guidance on fees and upcoming intakes", "Study live online from your home country"].map((benefit) => <li key={benefit} className="flex gap-3"><span className="text-(--color-cyan)" aria-hidden>✓</span>{benefit}</li>)}
          </ul>}
          {enquiry && <div className="relative aspect-[3/1] mt-5 overflow-hidden rounded-xl border border-white/10">
            <Image src="/images/journal/study-in-singapore-education-pathways.webp" alt="Illustration of international adult learners collaborating on their studies" fill sizes="(max-width: 767px) 100vw, 40vw" className="object-cover" />
          </div>}
        </div>
        <form onSubmit={onSubmit} className={`glass p-5 md:p-6 space-y-3 ${enquiry ? "enquiry-form" : ""}`}>
          {enquiry && <div><div className="kicker mb-1">[ ENQUIRE NOW ]</div><h3 className="font-display text-xl font-bold">Tell us what you’d like to learn</h3></div>}
          <div className="grid md:grid-cols-2 gap-3">
            <Input name="name" label="Full Name" required />
            <Input name="email" label="Email" type="email" required />
            <Input name="phone" label="Phone (with country code)" required />
            <Input name="nationality" label="Nationality" required />
            <Select
              name="course"
              label="Programme of Interest"
              className={enquiry ? "md:col-span-2" : ""}
              options={[
                "Cybersecurity",
                "Artificial Intelligence",
                "Blockchain",
                "Quantum Computing",
                "Not sure yet — please advise",
              ]}
              required
            />
            {!enquiry && <>
              <Select
                name="residency"
                label="Residency Status"
                options={[
                  "International / Non-Singaporean",
                  "Foreigner on Employment Pass / S Pass",
                  "Singapore PR",
                  "Singaporean",
                ]}
                required
              />
              <Input name="passport" label="Passport / ID No. (optional)" />
              <Input name="dob" label="Date of Birth" type="date" required />
            </>}
          </div>
          <div>
            <label htmlFor={`${source}-message`} className="kicker block mb-2">Message</label>
            <textarea
              id={`${source}-message`}
              name="message"
              rows={enquiry ? 2 : 3}
              className="w-full px-4 py-3 rounded-lg bg-white/3 border border-white/10 focus:outline-none focus:border-(--color-cyan) focus:ring-2 focus:ring-(--color-cyan)/20 transition placeholder:text-white/30"
              placeholder="Tell us about your goals or ask about programmes, fees and intakes."
            />
          </div>
          <div className="flex items-center justify-between gap-4 flex-wrap pt-2">
            <p className="text-xs text-(--color-muted) font-mono">
              [ We reply within 3-5 business days ]
            </p>
            <button type="submit" disabled={state === "sending"} className="btn-primary disabled:opacity-60">
              {state === "sending" ? "Submitting…" : enquiry ? "Send my enquiry →" : "Submit Registration →"}
            </button>
          </div>
          {msg && (
            <p role="status" aria-live="polite" className={state === "ok" ? "text-(--color-green) text-sm font-mono" : "text-red-400 text-sm font-mono"}>
              {msg}
            </p>
          )}
          <TurnstileWidget onToken={setTurnstileToken} />
        </form>
      </Container>
    </section>
  );
}

function Input({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="kicker block mb-2">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full px-4 py-3 rounded-lg bg-white/3 border border-white/10 focus:outline-none focus:border-(--color-cyan) focus:ring-2 focus:ring-(--color-cyan)/20 transition"
      />
    </label>
  );
}

function Select({
  name,
  label,
  options,
  required,
  className = "",
}: {
  name: string;
  label: string;
  options: string[];
  className?: string;
  required?: boolean;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="kicker block mb-2">{label}</span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full px-4 py-3 rounded-lg bg-white/3 border border-white/10 focus:outline-none focus:border-(--color-cyan) focus:ring-2 focus:ring-(--color-cyan)/20 transition appearance-none"
      >
        <option value="" disabled>Select an option</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-(--color-bg-elevated) text-white">
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
