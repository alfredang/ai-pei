import Link from "next/link";
import { Container } from "@/components/layout/Container";
import {
  HiCheckCircle,
  HiCpuChip,
  HiPencilSquare,
  HiSparkles,
  HiInboxArrowDown,
  HiLockClosed,
} from "react-icons/hi2";

const FEATURES: string[] = [
  "TipTap rich editor — image upload, slash commands, alt text, draft / published / archived",
  "Pages + Posts CRUD with Categories, Tags, and per-route SEO meta",
  "Filterable + paginated admin tables (search, status, color-coded pills)",
  "DB-driven header + footer menus — visual menu builder",
  "AI-assisted Blog and Pages drafting — Claude generates full posts and pages on demand",
  "Lead inbox — every contact-form submission emails sales via Gmail OAuth2",
  "AI chatbot — Claude Agent SDK on your subscription OAuth token",
  "Admin AI Assist — Draft, Rewrite, Summarize, Suggest SEO meta (one click)",
];

const PILLARS: Array<{
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  desc: string;
}> = [
  {
    icon: HiPencilSquare,
    label: "TipTap Editor",
    desc: "Rich text · images · slash commands · drafts",
  },
  {
    icon: HiSparkles,
    label: "Claude AI Assist",
    desc: "Draft posts · summarize · SEO meta — one click",
  },
  {
    icon: HiCpuChip,
    label: "AI Chatbot Chatbot",
    desc: "Configurable system prompt + FAQ · OAuth token",
  },
  {
    icon: HiInboxArrowDown,
    label: "Lead Capture",
    desc: "Contact form → admin inbox + Gmail OAuth2 email",
  },
  {
    icon: HiLockClosed,
    label: "Encrypted Vault",
    desc: "AES-256-GCM secrets · never returned to browser",
  },
  {
    icon: HiCheckCircle,
    label: "WP Migration",
    desc: "Import SQL dump · rewrite images · 301 redirects",
  },
];

export function CMSShowcase() {
  return (
    <section id="cms" className="relative py-4 overflow-hidden">
      <div
        className="glow-blob"
        style={{
          top: "-15%",
          left: "10%",
          width: 560,
          height: 560,
          background: "radial-gradient(circle, #5C00E5 0%, transparent 70%)",
          opacity: 0.28,
        }}
      />
      <Container className="relative">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-start">
          <div>
            <div className="kicker mb-5">[ AI-POWERED CMS ]</div>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[1.05]">
              AI-powered{" "}
              <span className="gradient-text">CMS for organizations</span>.
            </h2>
            <p className="mt-6 text-(--color-muted) text-lg max-w-xl">
              A self-hosted, production-grade content platform on Next.js 16, Postgres
              and Drizzle. Bring your Claude subscription OAuth token and get a
              chatbot, AI authoring, and a TipTap editor — no per-call billing, no
              vendor lock-in.
            </p>
            <ul className="mt-8 space-y-2.5">
              {FEATURES.map((f) => (
                <li key={f} className="flex gap-3 text-sm">
                  <HiCheckCircle className="text-(--color-cyan) shrink-0 mt-0.5 w-5 h-5" />
                  <span className="text-white/85">{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="#contact" className="btn-primary">
                Request a demo
              </Link>
              <Link
                href="https://github.com/alfredang/ai-cms"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                View on GitHub →
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-(--color-purple)/30 via-transparent to-(--color-cyan)/20 blur-2xl" />
            <div className="relative glass p-6 sm:p-8 overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-(--color-cyan) to-transparent" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-(--color-purple) to-(--color-cyan) flex items-center justify-center">
                  <HiCpuChip className="text-white w-5 h-5" />
                </div>
                <div>
                  <div className="kicker">[ PLATFORM PILLARS ]</div>
                  <div className="font-display font-bold text-lg">
                    AI-Powered CMS
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {PILLARS.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div
                      key={p.label}
                      className="px-4 py-3 rounded-lg bg-white/3 border border-white/8 hover:border-(--color-cyan)/50 transition group"
                    >
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <Icon className="w-5 h-5 text-(--color-purple-light) group-hover:text-(--color-cyan) transition" />
                        <div className="font-display font-bold text-white text-sm">
                          {p.label}
                        </div>
                      </div>
                      <div className="text-[11px] leading-snug text-(--color-muted)">
                        {p.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
