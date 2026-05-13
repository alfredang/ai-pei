import Link from "next/link";
import { Container } from "@/components/layout/Container";

export function Hero() {
  return (
    <section id="home" className="relative pt-24 pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-dark-deeper via-dark-primary to-dark-deeper" />
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.3), transparent 40%), radial-gradient(circle at 80% 60%, rgba(139,92,246,0.3), transparent 40%)",
        }}
      />
      <Container className="text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple bg-clip-text text-transparent">
            AI-Powered LMS & TMS
          </span>
          <br />
          <span className="text-white/90">for WSQ & TPQA Compliant Training</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
          Tertiary Infotech builds intelligent training management and learning platforms
          for Singapore training providers — meeting SSG / WSQ / TPQA requirements out of the box.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            href="#ai-lms-tms"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-cyan font-semibold hover:opacity-90 transition shadow-[var(--shadow-glow-blue)]"
          >
            See AI-LMS-TMS →
          </Link>
          <Link
            href="#contact"
            className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/5 font-semibold"
          >
            Talk to us
          </Link>
        </div>
      </Container>
    </section>
  );
}
