"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [msg, setMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source: "home" }),
      });
      if (!r.ok) throw new Error(await r.text());
      setState("ok");
      setMsg("Thanks — we'll be in touch shortly.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setState("err");
      setMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="contact" className="py-24">
      <Container className="max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-3">Let&apos;s talk</h2>
          <p className="text-white/70">
            Tell us about your training program or AI project. We respond within one business day.
          </p>
        </div>
        <form onSubmit={onSubmit} className="glass rounded-2xl p-8 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Input name="name" label="Your name" required />
            <Input name="email" label="Email" type="email" required />
            <Input name="company" label="Company" />
            <Input name="phone" label="Phone" />
          </div>
          <div>
            <label className="block text-sm mb-1">How can we help?</label>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 focus:outline-none focus:border-neon-blue"
            />
          </div>
          <button
            type="submit"
            disabled={state === "sending"}
            className="w-full md:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-cyan font-semibold disabled:opacity-50"
          >
            {state === "sending" ? "Sending…" : "Send inquiry"}
          </button>
          {msg && (
            <p className={state === "ok" ? "text-neon-cyan text-sm" : "text-red-400 text-sm"}>
              {msg}
            </p>
          )}
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
      <label className="block text-sm mb-1">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 focus:outline-none focus:border-neon-blue"
      />
    </div>
  );
}
