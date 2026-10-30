"use client";

import { useState } from "react";
import { TurnstileWidget } from "@/components/forms/TurnstileWidget";

/**
 * Exploratory application for international students, reached via an
 * affiliate's tracking link (/apply.html?ref=<code>). POSTs to /api/apply,
 * which stores it against the affiliate and emails the admissions team.
 */
export function ApplyForm({
  programs,
  refCode,
}: {
  programs: string[];
  refCode: string | null;
}) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [msg, setMsg] = useState<string>("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  // Intakes are monthly batches, so offer the next 18 months rather than a
  // free date picker.
  const now = new Date();
  const months = Array.from({ length: 18 }, (_, i) =>
    new Date(now.getFullYear(), now.getMonth() + 1 + i, 1).toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    }),
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const r = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          acknowledged: payload.acknowledged === "on",
          ref: refCode,
          turnstileToken,
        }),
      });
      if (r.status === 429) throw new Error("Too many submissions — please try again in a few minutes.");
      if (!r.ok) throw new Error("Please check your details and try again.");
      setState("ok");
      setMsg(
        "Thank you — we have received your application. We will email you once your intake batch is confirmed.",
      );
      form.reset();
    } catch (err) {
      setState("err");
      setMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass p-8 md:p-10 space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <Input name="name" label="Full Name (as in passport)" required />
        <Input name="email" label="Email" type="email" required />
        <Input name="phone" label="Tel (with country code)" type="tel" placeholder="+91 98765 43210" required />
        <Input name="nationality" label="Nationality" required />
      </div>

      <Select
        name="program"
        label="Programme of Interest"
        options={[...programs, "Not sure yet — please advise"]}
        required
      />
      <Select name="preferredStart" label="Preferred Start (tentative)" options={months} required />

      <div>
        <label className="kicker block mb-2">Message (optional)</label>
        <textarea
          name="message"
          rows={3}
          className="w-full px-4 py-3 rounded-lg bg-white/3 border border-white/10 focus:outline-none focus:border-(--color-cyan) focus:ring-2 focus:ring-(--color-cyan)/20 transition placeholder:text-white/30"
          placeholder="Your education background, questions about the programme, etc."
        />
      </div>

      <div className="rounded-lg border border-(--color-cyan)/30 bg-(--color-cyan)/5 p-5 text-sm text-white/80 space-y-2">
        <div className="kicker">Please note</div>
        <ul className="list-disc pl-5 space-y-1">
          <li>Your preferred start date is tentative. We will email you to confirm once the intake batch is confirmed.</li>
          <li>Once your batch is confirmed, we will send you the student contract with the official fee schedule.</li>
          <li>You are responsible for arranging your own accommodation and flights to Singapore.</li>
        </ul>
        <label className="flex items-start gap-3 pt-2 cursor-pointer">
          <input type="checkbox" name="acknowledged" required className="mt-1 accent-(--color-cyan)" />
          <span>I understand and agree to the above.</span>
        </label>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap pt-2">
        <p className="text-xs text-(--color-muted) font-mono">[ We reply within 3-5 business days ]</p>
        <button type="submit" disabled={state === "sending"} className="btn-primary disabled:opacity-60">
          {state === "sending" ? "Submitting…" : "Submit Application →"}
        </button>
      </div>

      {msg && (
        <p className={state === "ok" ? "text-(--color-green) text-sm font-mono" : "text-red-400 text-sm font-mono"}>
          {msg}
        </p>
      )}
      <TurnstileWidget onToken={setTurnstileToken} />
    </form>
  );
}

function Input({
  name,
  label,
  type = "text",
  placeholder,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="kicker block mb-2">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg bg-white/3 border border-white/10 focus:outline-none focus:border-(--color-cyan) focus:ring-2 focus:ring-(--color-cyan)/20 transition placeholder:text-white/30"
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
        defaultValue=""
        className="w-full px-4 py-3 rounded-lg bg-white/3 border border-white/10 focus:outline-none focus:border-(--color-cyan) focus:ring-2 focus:ring-(--color-cyan)/20 transition appearance-none"
      >
        <option value="" disabled className="bg-(--color-bg-elevated) text-white">
          Select an option
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-(--color-bg-elevated) text-white">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
