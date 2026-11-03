import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";

export function CTABanner() {
  return (
    <section className="relative py-4 overflow-hidden">
      <div
        className="glow-blob"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 700,
          background: "radial-gradient(circle, #10B981 0%, transparent 60%)",
          opacity: 0.15,
        }}
      />

      <Container className="relative">
        <div data-theme="dark" className="home-cta rounded-3xl p-7 sm:p-10 lg:p-14 overflow-hidden relative grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
          <div className="relative z-10">
            {/* Top accent line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-(--color-cyan) to-transparent" />

            <div className="kicker mb-5">[ INTAKE CLOSING SOON ]</div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] mb-5">
              Start Your Future-Tech Career in{" "}
              <span className="gradient-text">Singapore</span>
            </h2>
            <p className="text-(--color-muted) text-lg max-w-2xl mb-8">
              Seats for international learners are limited each intake. Secure your place in
              Cybersecurity, AI, Blockchain or Quantum Computing — and start building a globally
              recognised career in Asia&apos;s leading tech hub.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#contact" className="btn-primary text-lg px-8 py-4">
                Apply Now
                <span aria-hidden>→</span>
              </a>
              <Link href="/courses.html" className="btn-secondary text-lg px-8 py-4">
                Browse All Programmes
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3" aria-hidden="true">
            {["cybersecurity", "artificial-intelligence", "blockchain", "quantum-computing"].map((discipline, index) => (
              <div key={discipline} className={`relative aspect-square overflow-hidden rounded-2xl border border-white/10 ${index % 2 ? "translate-y-4" : "-translate-y-4"}`}>
                <Image src={`/images/programmes/${discipline}.webp`} alt="" fill sizes="(max-width: 1023px) 40vw, 20vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
