"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";

export function HomeHero() {
  return (
    <section
      id="hero"
      data-theme="dark"
      className="relative isolate overflow-hidden text-white"
    >
      {/* Full-bleed photograph */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-classroom.png"
          alt="Cyber security training at Tertiary Infotech Academy"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Light, left-weighted scrim — keeps the headline legible while letting
            the photograph stay bright and prominent. */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl min-h-[78vh] md:min-h-[88vh] flex flex-col justify-center py-24">
          {/* Headline — large, light-weight, airy */}
          <h1 className="font-display font-medium tracking-tight leading-[1.06] text-[clamp(2.6rem,6.4vw,5rem)] reveal">
            Advance Your Career in Cyber Security
          </h1>

          {/* Supporting paragraph */}
          <p className="mt-7 max-w-2xl text-lg md:text-xl text-white/85 leading-relaxed reveal reveal-d1">
            Earn an industry-recognised Advanced Certificate at a trusted Private
            Education Institution (PEI). Build job-ready skills across four
            stackable CompTIA modules — with up to 70% government funding.
          </p>

          {/* Single outlined pill CTA */}
          <div className="mt-10 reveal reveal-d2">
            <a
              href="#featured-course"
              className="inline-flex items-center gap-2 rounded-full border border-white/70 px-8 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:bg-white hover:text-black"
            >
              Explore the Programme
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
