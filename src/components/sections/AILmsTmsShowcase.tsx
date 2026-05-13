import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { AI_LMS_TMS_FEATURES } from "@/lib/site-content";
import { HiCheckCircle, HiSparkles } from "react-icons/hi2";

export function AILmsTmsShowcase() {
  return (
    <section id="ai-lms-tms" className="py-24 relative">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-purple/20 border border-neon-purple/50 text-xs font-medium mb-4">
              <HiSparkles className="text-neon-purple" /> Flagship product
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              AI-LMS-TMS for{" "}
              <span className="bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                WSQ & TPQA Compliance
              </span>
            </h2>
            <p className="text-white/70 text-lg mb-6">
              One platform for course delivery, learner tracking, attendance, certification, and
              audit-ready reporting — supercharged by AI for course creation, marking, and
              learner support.
            </p>
            <ul className="space-y-3">
              {AI_LMS_TMS_FEATURES.map((f) => (
                <li key={f} className="flex gap-3">
                  <HiCheckCircle className="text-neon-cyan shrink-0 mt-1" />
                  <span className="text-white/85">{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <Link
                href="#contact"
                className="px-5 py-3 rounded-lg bg-gradient-to-r from-neon-purple to-neon-pink font-semibold hover:opacity-90"
              >
                Request a demo
              </Link>
              <Link href="/blog" className="px-5 py-3 rounded-lg border border-white/20 hover:bg-white/5">
                Read case studies
              </Link>
            </div>
          </div>
          <div className="glass rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-neon-purple/30 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-neon-blue/30 blur-3xl" />
            <div className="relative space-y-4">
              <Badge label="WSQ" color="blue" />
              <Badge label="TPQA" color="cyan" />
              <Badge label="SCORM 1.2 / 2004" color="purple" />
              <Badge label="xAPI / Tin Can" color="pink" />
              <Badge label="SSG Course Submission API" color="blue" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Badge({ label, color }: { label: string; color: "blue" | "cyan" | "purple" | "pink" }) {
  const map: Record<string, string> = {
    blue: "bg-neon-blue/20 border-neon-blue/50 text-neon-blue",
    cyan: "bg-neon-cyan/20 border-neon-cyan/50 text-neon-cyan",
    purple: "bg-neon-purple/20 border-neon-purple/50 text-neon-purple",
    pink: "bg-neon-pink/20 border-neon-pink/50 text-neon-pink",
  };
  return (
    <div className={`px-4 py-3 rounded-lg border ${map[color]} font-medium`}>{label} ✓ Compliant</div>
  );
}
