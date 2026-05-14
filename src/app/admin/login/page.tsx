"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const from = params.get("from") ?? "/admin";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        setError("Invalid email or password");
        return;
      }
      window.location.href = from;
    } catch {
      setError("Login failed — please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="grid-bg opacity-60" />
      <div className="glow-blob" style={{ top: "-15%", left: "20%", width: 480, height: 480, background: "radial-gradient(circle, #5C00E5 0%, transparent 70%)" }} />
      <div className="glow-blob" style={{ bottom: "-15%", right: "10%", width: 420, height: 420, background: "radial-gradient(circle, #59EBFD 0%, transparent 70%)" }} />

      <form onSubmit={onSubmit} className="relative glass p-8 w-full max-w-md space-y-5 reveal">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-(--color-cyan) to-transparent" />
        <div>
          <div className="kicker mb-2">[ ADMIN ACCESS ]</div>
          <h1 className="font-display text-3xl font-extrabold">
            Sign in to <span className="gradient-text">Tertiary CMS</span>
          </h1>
        </div>
        <div>
          <label className="kicker block mb-2">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full px-4 py-3 rounded-lg bg-white/3 border border-white/10 focus:outline-none focus:border-(--color-cyan) focus:ring-2 focus:ring-(--color-cyan)/20 transition"
          />
        </div>
        <div>
          <label className="kicker block mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full px-4 py-3 pr-12 rounded-lg bg-white/3 border border-white/10 focus:outline-none focus:border-(--color-cyan) focus:ring-2 focus:ring-(--color-cyan)/20 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}
              className="flex items-center text-white/50 hover:text-(--color-cyan) transition"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" y1="2" x2="22" y2="22" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {error && (
          <p className="text-red-400 text-sm font-mono">[ ERROR ] {error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in →"}
        </button>
      </form>
    </div>
  );
}
