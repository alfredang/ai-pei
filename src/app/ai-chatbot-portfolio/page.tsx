import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { ServiceLeadForm } from "@/components/sections/ServiceLeadForm";
import { HiArrowUpRight, HiCheckCircle } from "react-icons/hi2";
import { FaGithub } from "react-icons/fa";

const PAGE_URL = "https://www.tertiaryinfotech.edu.sg/ai-chatbot-portfolio";

export const metadata: Metadata = {
  title: "AI Voice & Web Chatbot Portfolio | Tertiary Infotech Academy",
  description:
    "Live AI voice agents and web chatbots built by Tertiary Infotech Academy — Retell AI voice, Gemini chat, n8n workflows, Google Calendar. Browse repos, try the demos, book a consultation.",
  keywords:
    "AI chatbot Singapore, AI voice agent, Retell AI, Gemini chatbot, n8n automation, voice booking, chatbot consultancy",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "AI Voice & Web Chatbot Portfolio | Tertiary Infotech Academy",
    description:
      "Live AI voice agents and web chatbots — Retell AI, Gemini, n8n. Try the demos and book a free consultation.",
    locale: "en_SG",
    siteName: "Tertiary Infotech Academy",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Tertiary Infotech Academy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Voice & Web Chatbot Portfolio | Tertiary Infotech Academy",
    description: "Live AI voice agents and web chatbots built by Tertiary Infotech Academy.",
    images: ["/opengraph-image"],
  },
};

type Project = {
  name: string;
  category: string;
  type: "Voice + Web Chat" | "Voice Agent" | "Web Chatbot";
  description: string;
  stack: string[];
  github: string;
  live: string;
};

const PROJECTS: Project[] = [
  {
    name: "Homemart",
    category: "E-commerce · Household products",
    type: "Voice + Web Chat",
    description:
      "AI-powered household products store with a Retell AI voice assistant for hands-free shopping, a Gemini-powered text chatbot for product Q&A, and n8n workflows automating order routing and follow-up.",
    stack: ["Retell AI", "Gemini", "n8n", "Next.js"],
    github: "https://github.com/alfredang/homemart",
    live: "https://n8n-retell.vercel.app/",
  },
  {
    name: "GG Hair Salon",
    category: "Beauty & wellness · Appointment booking",
    type: "Voice + Web Chat",
    description:
      "Premium hair salon webapp with AI voice booking via Retell AI, a Gemini text chat concierge, n8n workflow orchestration, and live Google Calendar integration — customers book a stylist by phone or chat in under a minute.",
    stack: ["Retell AI", "Gemini", "n8n", "Google Calendar"],
    github: "https://github.com/alfredang/gghairsalon",
    live: "https://n8nnkhairworks.vercel.app",
  },
  {
    name: "Tertiary Voice Agent",
    category: "Education · Course enquiries",
    type: "Voice Agent",
    description:
      "AI voice agent landing page for Tertiary Infotech Academy powered by Retell.io — handles real-time inbound voice calls about course schedules, WSQ funding, and consultation booking, with a text chat fallback.",
    stack: ["Retell.io", "Next.js", "Real-time voice"],
    github: "https://github.com/alfredang/voiceagent",
    live: "https://tertiary-voiceagent.vercel.app/",
  },
];

const typeBadge: Record<Project["type"], string> = {
  "Voice + Web Chat": "bg-(--color-purple)/20 text-(--color-purple-light) border-(--color-purple)/40",
  "Voice Agent": "bg-(--color-cyan)/15 text-(--color-cyan) border-(--color-cyan)/30",
  "Web Chatbot": "bg-(--color-amber)/15 text-(--color-amber) border-(--color-amber)/30",
};

const CAPABILITIES = [
  "Inbound & outbound voice agents (Retell AI / Retell.io)",
  "Web chatbots with Gemini, Claude, or open-source LLMs",
  "n8n workflow automation — CRM, email, WhatsApp, calendar",
  "Google Calendar / Outlook booking integration",
  "Lead capture wired into your existing pipeline",
  "Singapore deployment + bilingual support (EN/中文)",
];

export default function AiChatbotPortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-12 pb-16 overflow-hidden">
          <div className="grid-bg opacity-60" />
          <div
            className="glow-blob"
            style={{ top: "-20%", left: "10%", width: 500, height: 500, background: "radial-gradient(circle, #5C00E5 0%, transparent 70%)" }}
          />
          <div
            className="glow-blob"
            style={{ top: "20%", right: "0%", width: 420, height: 420, background: "radial-gradient(circle, #59EBFD 0%, transparent 70%)" }}
          />
          <Container className="relative">
            <div className="kicker mb-4">[ AI CHATBOT PORTFOLIO ]</div>
            <h1 className="font-display text-[clamp(2rem,5vw,4rem)] font-extrabold leading-[1.05] max-w-4xl">
              Live AI <span className="gradient-text">voice agents</span> &amp;{" "}
              <span className="gradient-text-warm">web chatbots</span>.
            </h1>
            <p className="mt-6 text-lg text-(--color-muted) max-w-3xl">
              Production deployments combining Retell AI voice, Gemini chat, and n8n workflows — built,
              shipped, and running for real customers in Singapore. Try the demos, read the source.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#consult" className="btn-primary">Book a consultation →</a>
              <a href="#projects" className="px-5 py-3 rounded-lg border border-white/15 text-sm font-mono hover:border-(--color-cyan) transition">
                See the projects ↓
              </a>
            </div>
          </Container>
        </section>

        <section id="projects" className="pb-20">
          <Container>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROJECTS.map((p) => (
                <article key={p.name} className="card-hover glass p-7 relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-(--color-cyan) to-transparent" />
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <div className="kicker mb-1 truncate">{p.category}</div>
                      <h2 className="font-display font-bold text-2xl text-white truncate">{p.name}</h2>
                    </div>
                    <span className={`shrink-0 font-mono text-[10px] px-2 py-1 rounded border ${typeBadge[p.type]}`}>
                      {p.type}
                    </span>
                  </div>
                  <p className="text-sm text-(--color-muted) leading-relaxed mb-5 flex-1">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.stack.map((s) => (
                      <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-(--color-muted)">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 border-t border-white/8">
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-mono text-(--color-cyan) hover:gap-2.5 transition-all"
                    >
                      Live demo <HiArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-mono text-(--color-amber) hover:gap-2.5 transition-all"
                    >
                      <FaGithub className="w-3.5 h-3.5" /> GitHub
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="relative py-20 overflow-hidden">
          <div
            className="glow-blob"
            style={{ bottom: "-20%", left: "40%", width: 500, height: 500, background: "radial-gradient(circle, #5C00E5 0%, transparent 70%)", opacity: 0.3 }}
          />
          <Container className="relative">
            <div className="kicker mb-4">[ WHAT WE BUILD ]</div>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold leading-tight mb-8 max-w-3xl">
              From a phone call to a fully automated funnel — <span className="gradient-text">on your stack</span>.
            </h2>
            <ul className="grid md:grid-cols-2 gap-3 max-w-4xl">
              {CAPABILITIES.map((c) => (
                <li key={c} className="flex items-start gap-3 glass px-5 py-4">
                  <HiCheckCircle className="text-(--color-cyan) mt-0.5 shrink-0" />
                  <span className="text-sm text-white/85">{c}</span>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section id="consult" className="py-20">
          <Container>
            <div className="grid lg:grid-cols-5 gap-10 items-start">
              <div className="lg:col-span-2">
                <div className="kicker mb-4">[ FREE CONSULTATION ]</div>
                <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-tight mb-4">
                  Want one of these for <span className="gradient-text">your business</span>?
                </h2>
                <p className="text-(--color-muted) text-lg mb-6">
                  Tell us about your use case — inbound calls, bookings, e-commerce, lead qualification — and
                  we&apos;ll scope a working prototype within 1 business day.
                </p>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2"><HiCheckCircle className="text-(--color-cyan) mt-0.5 shrink-0" /> Singapore-based team · WSQ + TPQA accredited</li>
                  <li className="flex items-start gap-2"><HiCheckCircle className="text-(--color-cyan) mt-0.5 shrink-0" /> Fixed-scope prototypes from 2 weeks</li>
                  <li className="flex items-start gap-2"><HiCheckCircle className="text-(--color-cyan) mt-0.5 shrink-0" /> Source code delivered — no vendor lock-in</li>
                </ul>
              </div>
              <div className="lg:col-span-3">
                <ServiceLeadForm
                  source="ai-chatbot-portfolio"
                  buttonLabel="Request a chatbot consultation →"
                  qualifyingPlaceholder="Use case (voice / web chat / both), expected call or message volume, languages, integrations (CRM, calendar, WhatsApp)…"
                />
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
