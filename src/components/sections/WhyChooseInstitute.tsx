import { Container } from "@/components/layout/Container";
import { HiShieldCheck, HiAcademicCap, HiGlobeAlt } from "react-icons/hi2";

const REASONS = [
  {
    icon: HiShieldCheck,
    title: "WSQ & IBF Approved Training Organisation",
    description:
      "We are a SkillsFuture Singapore (SSG) recognised WSQ and IBF Approved Training Organisation. Our programmes are eligible for up to 70% government funding, making quality education accessible and affordable.",
  },
  {
    icon: HiAcademicCap,
    title: "CompTIA Authorised Delivery Partner",
    description:
      "As an official CompTIA Authorised Delivery Partner, our curriculum follows globally recognised certification standards. Graduates are prepared for internationally accepted CompTIA exams including A+, Security+, Linux+, CySA+ and PenTest+.",
  },
  {
    icon: HiGlobeAlt,
    title: "Flexible E-Learning with Expert Trainers",
    description:
      "Our online classes offer flexibility without sacrificing quality. Learn from PhD-qualified trainers and industry professionals with a teacher-to-student ratio of 1:20, ensuring personalised guidance and support.",
  },
];

export function WhyChooseInstitute() {
  return (
    <section id="why-us" className="relative py-20 overflow-hidden">
      <div className="grid-bg opacity-30" />
      <div
        className="glow-blob"
        style={{
          top: "10%",
          right: "-5%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, #5C00E5 0%, transparent 60%)",
          opacity: 0.12,
        }}
      />

      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="kicker mb-4">[ WHY CHOOSE US ]</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05]">
            Why Choose <span className="gradient-text">Tertiary Infotech Academy</span>?
          </h2>
          <p className="mt-5 text-(--color-muted) text-lg">
            Established in 2012, we are a leading skills-based training provider dedicated to
            supporting Singapore&apos;s Industry 4.0 transformation. As a registered Private Education
            Institute (PEI), we deliver certified programmes in Cyber Security and Artificial Intelligence.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="glass p-8 hover:border-white/15 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-(--color-cyan)/10 border border-(--color-cyan)/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-(--color-cyan)" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-3 leading-snug">
                  {reason.title}
                </h3>
                <p className="text-sm text-(--color-muted) leading-relaxed">{reason.description}</p>
              </div>
            );
          })}
        </div>

        {/* Partner logos strip */}
        <div className="mt-14 text-center">
          <div className="text-xs font-mono uppercase tracking-wider text-(--color-muted) mb-6">
            Authorised Training & Testing Partners
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              "Microsoft Learning Partner",
              "CompTIA Delivery Partner",
              "Linux Foundation Partner",
              "AWS Training Partner",
              "Pearson VUE Test Center",
              "Kryterion Test Center",
            ].map((partner) => (
              <span
                key={partner}
                className="px-4 py-2 rounded-lg bg-white/4 border border-white/8 text-xs font-medium text-white/50 hover:text-white/70 hover:border-white/15 transition"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
