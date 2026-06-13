"use client";

import { Container } from "@/components/layout/Container";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: "4", label: "Future-Tech Disciplines", suffix: "" },
  { value: "100", label: "English-Taught", suffix: "%" },
  { value: "600", label: "ASEAN Market Reach", suffix: "M+" },
  { value: "1", label: "Asia Tech & Fintech Hub", suffix: "st" },
  { value: "3", label: "Visa & Pass Pathways", suffix: "+" },
  { value: "20", label: "Tech Career Roles", suffix: "+" },
];

function AnimatedCounter({ target, suffix }: { target: string; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const numTarget = parseInt(target, 10);
          if (isNaN(numTarget)) {
            setCount(0);
            return;
          }
          const duration = 1200;
          const steps = 40;
          const stepDuration = duration / steps;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * numTarget));
            if (step >= steps) clearInterval(timer);
          }, stepDuration);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-display font-extrabold text-3xl md:text-4xl text-white tabular-nums">
      {count}
      {suffix && <span className="text-lg text-(--color-cyan) ml-0.5">{suffix}</span>}
    </span>
  );
}

export function StatsStrip() {
  return (
    <section className="relative py-6 border-y border-white/5 bg-(--color-bg-elevated)/50">
      <Container>
        <div className="stats-strip">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <div className="text-xs font-mono uppercase tracking-wider text-(--color-muted) mt-1.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
