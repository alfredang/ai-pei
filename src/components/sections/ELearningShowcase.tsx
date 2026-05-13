import Link from "next/link";
import { Container } from "@/components/layout/Container";
import {
  HiCheckCircle,
  HiAcademicCap,
  HiVideoCamera,
  HiSparkles,
  HiUserGroup,
} from "react-icons/hi2";

const FEATURES: string[] = [
  "Multi-tenant — isolated academies on a shared platform",
  "6 user roles (Platform Owner, Academy Admin, Course Developer, Marketer, Learner, Support)",
  "Video upload & transcoding with Cloudinary CDN delivery",
  "SCORM 1.2 / 2004 + xAPI (TinCan) compliant content packaging",
  "8 lecture types — Video, Text, Quiz, PDF, SCORM, xAPI, Voice-Over Slides, Downloadable",
  "5 quiz types — MCQ, multi-select, true/false, drag-and-drop ordering, open-ended",
  "AI-assisted authoring — outlines, objectives, quizzes, voice-over text, metadata",
];

const PILLARS: Array<{
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  desc: string;
}> = [
  {
    icon: HiUserGroup,
    label: "Multi-Tenant",
    desc: "One platform · many academies · isolated data",
  },
  {
    icon: HiVideoCamera,
    label: "Video + SCORM/xAPI",
    desc: "Upload, transcode, deliver · SCORM 1.2/2004 + TinCan",
  },
  {
    icon: HiSparkles,
    label: "AI Authoring",
    desc: "Claude-powered course outlines, quizzes & voice-over",
  },
  {
    icon: HiAcademicCap,
    label: "Flexible Lecture Types",
    desc: "8 formats · 5 quiz types · drag-and-drop builder",
  },
];

export function ELearningShowcase() {
  return (
    <section id="e-learning" className="relative pt-4 pb-6 overflow-hidden">
      <div
        className="glow-blob"
        style={{
          top: "-15%",
          right: "20%",
          width: 560,
          height: 560,
          background: "radial-gradient(circle, #59EBFD 0%, transparent 70%)",
          opacity: 0.25,
        }}
      />
      <Container className="relative">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-14 items-start">
          <div className="relative">
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-(--color-cyan)/25 via-transparent to-(--color-purple)/30 blur-2xl" />
            <div className="relative glass p-6 sm:p-8 overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-(--color-purple) to-transparent" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-(--color-cyan) to-(--color-purple) flex items-center justify-center">
                  <HiAcademicCap className="text-white w-5 h-5" />
                </div>
                <div>
                  <div className="kicker">[ PLATFORM PILLARS ]</div>
                  <div className="font-display font-bold text-lg">Learnify Multi-Tenant LMS</div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {PILLARS.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div
                      key={p.label}
                      className="px-4 py-3 rounded-lg bg-white/3 border border-white/8 hover:border-(--color-purple)/50 transition group"
                    >
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <Icon className="w-5 h-5 text-(--color-cyan) group-hover:text-(--color-purple) transition" />
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

          <div>
            <div className="kicker mb-5">[ NEW · MULTI-TENANT PRODUCT ]</div>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[1.05]">
              AI-powered{" "}
              <span className="gradient-text">multi-tenant e-Learning</span> platform
              for organizations.
            </h2>
            <p className="mt-6 text-(--color-muted) text-lg max-w-xl">
              Built on Next.js 16 and Claude — Learnify lets academies, course
              developers and learners launch, sell and certify online courses on a
              single secure platform. Stripe payments, SCORM/xAPI, AI authoring and
              an immutable financial ledger are baked in.
            </p>
            <ul className="mt-8 space-y-2.5">
              {FEATURES.map((f) => (
                <li key={f} className="flex gap-3 text-sm">
                  <HiCheckCircle className="text-(--color-purple) shrink-0 mt-0.5 w-5 h-5" />
                  <span className="text-white/85">{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="#contact" className="btn-primary">
                Request a demo
              </Link>
              <Link href="/real-clients" className="btn-secondary">
                Real Clients
              </Link>
              <Link
                href="https://github.com/alfredang/learnify-iesa-lms"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                View on GitHub →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
