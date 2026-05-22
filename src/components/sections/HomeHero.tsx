"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";

export function HomeHero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Full-width image with overlay */}
      <div className="relative min-h-[75vh] md:min-h-[85vh] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-classroom.png"
            alt="Cyber Security training classroom"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-(--color-bg)/95 via-(--color-bg)/75 to-(--color-bg)/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-(--color-bg) via-transparent to-(--color-bg)/30" />
        </div>

        <Container className="relative z-10 py-20">
          <div className="max-w-2xl">
            {/* Kicker */}
            <div className="kicker mb-5 reveal">[ SSG REGISTERED PEI ]</div>

            {/* Main headline */}
            <h1 className="font-display text-[clamp(2.2rem,5.5vw,4rem)] font-extrabold leading-[1.08] mb-6 reveal reveal-d1">
              Build Your Future in{" "}
              <span className="gradient-text">Cyber Security</span>
              {" "}with an Industry-Recognised Certification
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-white/75 max-w-xl mb-8 leading-relaxed reveal reveal-d2">
              Tertiary Infotech Academy is a WSQ & IBF Approved Training Organisation and registered PEI,
              offering advanced certificate programmes with up to 70% government funding. SkillsFuture Credit claimable.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 reveal reveal-d3">
              <a href="#featured-course" className="btn-primary text-base">
                Explore Our Course
                <span aria-hidden>→</span>
              </a>
              <a href="#contact" className="btn-secondary text-base">
                Register Now
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center gap-3 reveal reveal-d4">
              {["WSQ ATO", "IBF ATO", "CompTIA Partner", "PEI Registered"].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 rounded-full bg-white/8 border border-white/12 text-xs font-mono font-medium text-white/60"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
