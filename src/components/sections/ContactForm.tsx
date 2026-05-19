"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { TurnstileWidget } from "@/components/forms/TurnstileWidget";

const MOCK_COURSES = [
  "Generative AI for Executives",
  "WSQ Data Analytics with Python",
  "Advanced Prompt Engineering",
  "Full-Stack Web Development BootCamp",
  "Certified AI Ethics & Governance",
];

export function ContactForm() {
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
        body: JSON.stringify({ ...payload, source: "home", turnstileToken }),
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
    <section id="contact" className="relative py-4 overflow-hidden">
      <div className="glow-blob" style={{ top: "10%", right: "0", width: 480, height: 480, background: "radial-gradient(circle, #5C00E5 0%, transparent 70%)" }} />
      <Container className="max-w-4xl relative">
        <div className="text-center mb-6">
          <div className="kicker mb-4">[ REGISTER TODAY ]</div>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] mb-4">
            Course <span className="gradient-text">Registration</span>.
          </h2>
          <p className="text-(--color-muted) text-lg">
            Secure your spot in our upcoming classes. Fill in your details below.
          </p>
        </div>
        <form onSubmit={onSubmit} className="glass p-8 md:p-10 space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <Input name="name" label="Student Name" required />
            <Input name="email" label="Email" type="email" required />
            <Input name="phone" label="Tel" required />
            <Input name="nationality" label="Nationality" required />
            <Input name="nric" label="NRIC (Last 4 Characters)" required />
            <Select name="gender" label="Gender" options={["Male", "Female", "Prefer not to say"]} required />
            <Input name="dob" label="Date of Birth" type="date" required />
            <Select name="course" label="Course Interested" options={MOCK_COURSES} required />
          </div>
          <div>
            <label className="kicker block mb-2">Message</label>
            <textarea
              name="message"
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-white/3 border border-white/10 focus:outline-none focus:border-(--color-cyan) focus:ring-2 focus:ring-(--color-cyan)/20 transition placeholder:text-white/30"
              placeholder="Any special requests or inquiries?"
            />
          </div>
          <div className="flex items-center justify-between gap-4 flex-wrap pt-2">
            <p className="text-xs text-(--color-muted) font-mono">
              [ We reply within 3-5 business days ]
            </p>
            <button type="submit" disabled={state === "sending"} className="btn-primary disabled:opacity-60">
              {state === "sending" ? "Submitting…" : "Submit Registration →"}
            </button>
          </div>
          {msg && (
            <p className={state === "ok" ? "text-(--color-green) text-sm font-mono" : "text-red-400 text-sm font-mono"}>
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
    <div>
      <label className="kicker block mb-2">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full px-4 py-3 rounded-lg bg-white/3 border border-white/10 focus:outline-none focus:border-(--color-cyan) focus:ring-2 focus:ring-(--color-cyan)/20 transition"
      />
    </div>
  );
}

function Select({
  name,
  label,
  options,
  required,
}: {
  name: string;
  label: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="kicker block mb-2">{label}</label>
      <select
        name={name}
        required={required}
        className="w-full px-4 py-3 rounded-lg bg-white/3 border border-white/10 focus:outline-none focus:border-(--color-cyan) focus:ring-2 focus:ring-(--color-cyan)/20 transition appearance-none"
      >
        <option value="" disabled selected>Select an option</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-(--color-bg-elevated) text-white">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
