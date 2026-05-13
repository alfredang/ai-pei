import { Container } from "@/components/layout/Container";
import { EDTOOL_GROUPS } from "@/lib/edtools-content";
import { HiArrowUpRight } from "react-icons/hi2";

const accentMap: Record<string, { dot: string; text: string; chip: string; line: string }> = {
  cyan: {
    dot: "bg-(--color-cyan)",
    text: "text-(--color-cyan)",
    chip: "border-(--color-cyan)/30 text-(--color-cyan) hover:bg-(--color-cyan)/10",
    line: "from-(--color-cyan) to-transparent",
  },
  amber: {
    dot: "bg-(--color-amber)",
    text: "text-(--color-amber)",
    chip: "border-(--color-amber)/30 text-(--color-amber) hover:bg-(--color-amber)/10",
    line: "from-(--color-amber) to-transparent",
  },
  green: {
    dot: "bg-(--color-green)",
    text: "text-(--color-green)",
    chip: "border-(--color-green)/30 text-(--color-green) hover:bg-(--color-green)/10",
    line: "from-(--color-green) to-transparent",
  },
  purple: {
    dot: "bg-(--color-purple-light)",
    text: "text-(--color-purple-light)",
    chip: "border-(--color-purple)/40 text-(--color-purple-light) hover:bg-(--color-purple)/15",
    line: "from-(--color-purple) to-transparent",
  },
};

const totalTools = EDTOOL_GROUPS.reduce((n, g) => n + g.tools.length, 0);

export function EdToolsShowcase() {
  return (
    <section id="edtools" className="relative py-12 overflow-hidden">
      <div className="grid-bg opacity-40" />
      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="kicker mb-4">[ TRAINER TOOLKIT ]</div>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05]">
              <span className="gradient-text-warm">{totalTools}+ EdTools</span> built into every
              classroom.
            </h2>
            <p className="mt-5 text-(--color-muted) text-lg">
              Interactive engagement, problem-solving frameworks, cyber-security labs, analytics,
              finance, statistics, and GenAI — all launchable from the trainer dashboard.
            </p>
          </div>
          <a
            href="https://github.com/alfredang/AI-LMS-TMS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-mono text-(--color-cyan) hover:gap-3 transition-all"
          >
            BROWSE ON GITHUB <HiArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {EDTOOL_GROUPS.map((g) => {
            const a = accentMap[g.accent];
            return (
              <div key={g.category} className="glass p-6 relative overflow-hidden">
                <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r ${a.line}`} />
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${a.dot}`} />
                  <span className={`kicker ${a.text}`}>{g.category}</span>
                </div>
                <p className="text-xs text-(--color-muted) mb-4">{g.tagline}</p>
                <div className="flex flex-wrap gap-2">
                  {g.tools.map((t) => (
                    <a
                      key={t.url}
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs px-2.5 py-1 rounded border bg-white/2 transition ${a.chip}`}
                    >
                      {t.name}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
