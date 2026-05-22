import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { HiShieldCheck, HiAcademicCap, HiArrowRight } from "react-icons/hi2";

export function FeaturedCourse() {
  return (
    <section id="featured-course" className="relative py-20 overflow-hidden">
      <div
        className="glow-blob"
        style={{
          top: "0%",
          left: "30%",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, #5C00E5 0%, transparent 60%)",
          opacity: 0.1,
        }}
      />

      <Container className="relative">
        <div className="text-center mb-12">
          <div className="kicker mb-4">[ OUR PROGRAMME ]</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05]">
            Advanced Certificate <span className="gradient-text">Programme</span>
          </h2>
          <p className="mt-4 text-(--color-muted) text-lg max-w-2xl mx-auto">
            Our PEI-registered programme prepares you for globally recognised CompTIA certifications
            with up to 70% WSQ funding available.
          </p>
        </div>

        {/* Featured course card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            {/* Glow outline on hover */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-(--color-cyan)/20 via-(--color-purple)/20 to-(--color-amber)/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />

            <div className="relative pricing-card p-0 overflow-hidden">
              <div className="grid md:grid-cols-[1.1fr_0.9fr]">
                {/* Left: Course info */}
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-(--color-cyan)/20 to-(--color-purple)/20 border border-(--color-cyan)/25 flex items-center justify-center">
                      <HiShieldCheck className="w-6 h-6 text-(--color-cyan)" />
                    </div>
                    <div>
                      <span className="tag-foundation">PEI Certificate</span>
                    </div>
                  </div>

                  <h3 className="font-display font-extrabold text-2xl md:text-3xl text-white mb-3 leading-tight">
                    Advanced Certificate in Cyber Security
                  </h3>

                  <p className="text-(--color-muted) leading-relaxed mb-6">
                    A comprehensive training pathway consisting of 4 stackable WSQ modules —
                    3 foundation modules (CompTIA A+, Security+, Linux+) and 1 elective module
                    (CompTIA CySA+ or PenTest+). Designed to build progressively from fundamental
                    IT skills to specialised cybersecurity competencies.
                  </p>

                  {/* Module pills */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {["CompTIA A+", "Security+", "Linux+", "CySA+ / PenTest+"].map((mod) => (
                      <span
                        key={mod}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono font-medium text-white/70"
                      >
                        {mod}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/courses/advanced-certificate-in-cyber-security"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    View Full Course Details
                    <HiArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Right: Quick facts */}
                <div className="bg-white/[0.02] border-t md:border-t-0 md:border-l border-white/8 p-8 md:p-10 flex flex-col justify-center">
                  <div className="space-y-5">
                    {[
                      { label: "Course Fee", value: "$9,000", note: "Before WSQ subsidy" },
                      { label: "WSQ Funded", value: "Up to 70%", note: "SG citizens ≥ 40 / SME-sponsored" },
                      { label: "Net Fee From", value: "$2,700", note: "After maximum subsidy" },
                      { label: "Duration", value: "2 Months", note: "Full-Time · E-Learning" },
                      { label: "Modules", value: "4 Stackable", note: "3 Foundation + 1 Elective" },
                      { label: "Assessment", value: "3 Hours", note: "Online per module" },
                    ].map((fact) => (
                      <div key={fact.label} className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xs font-mono uppercase tracking-wider text-(--color-muted)">
                            {fact.label}
                          </div>
                          <div className="text-[0.7rem] text-white/40 mt-0.5">{fact.note}</div>
                        </div>
                        <div className="font-display font-bold text-white text-right whitespace-nowrap">
                          {fact.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/8">
                    <div className="flex items-center gap-2 text-sm text-(--color-green)">
                      <HiAcademicCap className="w-5 h-5" />
                      <span className="font-medium">SkillsFuture Credit Claimable</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
