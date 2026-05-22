import Link from "next/link";
import { Container } from "@/components/layout/Container";

export function CTABanner() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div
        className="glow-blob"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 700,
          background: "radial-gradient(circle, #5C00E5 0%, transparent 60%)",
          opacity: 0.15,
        }}
      />

      <Container className="relative">
        <div className="glass p-10 md:p-16 text-center overflow-hidden relative">
          {/* Top accent line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-(--color-cyan) to-transparent" />

          <div className="kicker mb-5">[ ENROL TODAY ]</div>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] mb-5">
            Level Up Your Career in{" "}
            <span className="gradient-text">Cyber Security</span>
          </h2>
          <p className="text-(--color-muted) text-lg max-w-2xl mx-auto mb-10">
            With up to 70% WSQ funding and SkillsFuture Credit claimable, there has never been a better
            time to gain globally recognised cybersecurity certifications. Secure your spot today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#contact" className="btn-primary text-lg px-8 py-4">
              Register Now
              <span aria-hidden>→</span>
            </a>
            <Link
              href="/courses/advanced-certificate-in-cyber-security"
              className="btn-secondary text-lg px-8 py-4"
            >
              View Course Details
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
