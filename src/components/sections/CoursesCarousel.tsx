"use client";

import { Container } from "@/components/layout/Container";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  HiCpuChip,
  HiShieldCheck,
  HiCommandLine,
  HiFingerPrint,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";

const MODULES = [
  {
    id: "mod-1",
    number: "01",
    title: "CompTIA A+",
    subtitle: "IT Support & Infrastructure Fundamentals",
    description:
      "Build a strong foundation in IT support, covering hardware, operating systems, networking basics, and essential troubleshooting skills. Manage IT infrastructure, perform system diagnostics, and maintain secure device configurations.",
    icon: HiCpuChip,
    type: "foundation" as const,
    color: "var(--color-cyan)",
    topics: ["Hardware & Networking", "OS & Troubleshooting", "System Diagnostics", "Device Security"],
  },
  {
    id: "mod-2",
    number: "02",
    title: "CompTIA Security+",
    subtitle: "Core Cyber Security Principles",
    description:
      "Master essential cybersecurity concepts including threat intelligence, security controls, risk management, and incident response. Secure networks, apply cryptographic principles, and implement access management strategies.",
    icon: HiShieldCheck,
    type: "foundation" as const,
    color: "var(--color-green)",
    topics: ["Threat Intelligence", "Risk Management", "Cryptography", "Access Control"],
  },
  {
    id: "mod-3",
    number: "03",
    title: "CompTIA Linux+",
    subtitle: "Linux Systems & Security Administration",
    description:
      "Linux is the backbone of servers, cloud systems, and security tools. Configure, maintain, and secure Linux environments through command-line operations, file permissions, scripting, and network configuration.",
    icon: HiCommandLine,
    type: "foundation" as const,
    color: "var(--color-purple-light)",
    topics: ["Command-Line Ops", "File Permissions", "Shell Scripting", "Network Config"],
  },
  {
    id: "mod-4a",
    number: "4A",
    title: "CompTIA CySA+",
    subtitle: "Cybersecurity Analyst",
    description:
      "Focus on security analytics, threat detection, SIEM monitoring, and behavioral analysis. Gain practical experience in incident response, vulnerability management, and security automation for SOC roles.",
    icon: HiFingerPrint,
    type: "elective" as const,
    color: "var(--color-amber)",
    topics: ["SIEM Monitoring", "Threat Detection", "Incident Response", "Security Automation"],
  },
  {
    id: "mod-4b",
    number: "4B",
    title: "CompTIA PenTest+",
    subtitle: "Penetration Testing & Ethical Hacking",
    description:
      "Hands-on training in offensive security. Conduct vulnerability assessments, exploit network and application weaknesses, and perform post-exploitation activities using industry-standard tools.",
    icon: HiCommandLine,
    type: "elective" as const,
    color: "var(--color-amber)",
    topics: ["Vulnerability Assessment", "Network Exploits", "Web App Testing", "Red Teaming"],
  },
];

export function CoursesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-module-card]");
    if (cards[index]) {
      const cardLeft = cards[index].offsetLeft;
      const containerPadding = 16;
      el.scrollTo({ left: cardLeft - containerPadding, behavior: "smooth" });
    }
    setActiveIndex(index);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => {
      const next = (prev + 1) % MODULES.length;
      scrollToIndex(next);
      return next;
    });
  }, [scrollToIndex]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => {
      const next = (prev - 1 + MODULES.length) % MODULES.length;
      scrollToIndex(next);
      return next;
    });
  }, [scrollToIndex]);

  // Auto-scroll
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isPausedRef.current) goNext();
    }, 4500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [goNext]);

  // Track scroll position for dots
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const cards = el.querySelectorAll<HTMLElement>("[data-module-card]");
        const scrollLeft = el.scrollLeft + el.offsetWidth / 3;
        let closest = 0;
        let closestDist = Infinity;
        cards.forEach((card, i) => {
          const dist = Math.abs(card.offsetLeft - scrollLeft);
          if (dist < closestDist) {
            closestDist = dist;
            closest = i;
          }
        });
        setActiveIndex(closest);
        ticking = false;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="modules" className="relative py-20 overflow-hidden">
      <div
        className="glow-blob"
        style={{
          top: "5%",
          left: "-5%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, var(--color-purple) 0%, transparent 60%)",
          opacity: 0.12,
        }}
      />

      <Container className="relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="kicker mb-3">[ 4 STACKABLE MODULES ]</div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1]">
              Course <span className="gradient-text">Modules</span>
            </h2>
            <p className="mt-4 text-(--color-muted) max-w-xl text-lg">
              Complete 3 foundation modules and 1 elective to earn your Advanced Certificate in Cyber Security.
            </p>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              aria-label="Previous module"
              className="w-10 h-10 rounded-lg border border-white/10 bg-white/3 flex items-center justify-center text-white/60 hover:text-white hover:border-(--color-cyan)/40 transition"
            >
              <HiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goNext}
              aria-label="Next module"
              className="w-10 h-10 rounded-lg border border-white/10 bg-white/3 flex items-center justify-center text-white/60 hover:text-white hover:border-(--color-cyan)/40 transition"
            >
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="-mx-4 px-4">
          <div
            ref={scrollRef}
            className="carousel-scroll flex gap-5 overflow-x-auto pb-6"
            onMouseEnter={() => { isPausedRef.current = true; }}
            onMouseLeave={() => { isPausedRef.current = false; }}
          >
            {MODULES.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.id}
                  data-module-card
                  className="carousel-item module-card shrink-0 w-[320px] sm:w-[360px] lg:w-[380px]"
                >
                  <div className="h-full bg-(--color-bg-elevated) border border-white/8 rounded-2xl p-7 flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <span className="module-number">{mod.number}</span>
                        <span className={mod.type === "foundation" ? "tag-foundation" : "tag-elective"}>
                          {mod.type}
                        </span>
                      </div>
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: `color-mix(in srgb, ${mod.color} 15%, transparent)` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: mod.color }} />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="font-display font-bold text-xl text-white mb-1">{mod.title}</h3>
                    <p className="text-sm font-medium text-(--color-cyan)/70 mb-3">{mod.subtitle}</p>
                    <p className="text-sm text-(--color-muted) leading-relaxed mb-5 flex-1">
                      {mod.description}
                    </p>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/8">
                      {mod.topics.map((topic) => (
                        <span
                          key={topic}
                          className="text-[0.7rem] font-mono px-2.5 py-1 rounded-md bg-white/4 border border-white/8 text-(--color-muted)"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {MODULES.map((mod, i) => (
            <button
              key={mod.id}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to module ${i + 1}`}
              className={`carousel-dot ${i === activeIndex ? "active" : ""}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
