"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle "matrix rain" canvas background for the hero — falling green glyphs.
 * Sizes itself to its positioned parent; pointer-events-none + aria-hidden so
 * it's purely decorative.
 */
export function MatrixRain({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const context = el.getContext("2d");
    if (!context) return;
    const canvas = el;
    const ctx = context;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const glyphs =
      "アイウエオカキクケコサシスセソ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%*+=<>/".split("");
    const fontSize = 16;
    let width = 0;
    let height = 0;
    let drops: number[] = [];
    let raf = 0;
    let last = 0;

    function resize() {
      const parent = canvas.parentElement;
      width = canvas.width = parent ? parent.clientWidth : window.innerWidth;
      height = canvas.height = parent ? parent.clientHeight : window.innerHeight;
      const columns = Math.max(1, Math.floor(width / fontSize));
      drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -60));
    }
    resize();

    function draw(t: number) {
      raf = requestAnimationFrame(draw);
      // Throttle to a calm ~13fps so the rain is subtle, not frantic.
      if (t - last < 75) return;
      last = t;
      // Fade the previous frame to leave glyph trails.
      ctx.fillStyle = "rgba(5, 8, 16, 0.10)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "rgba(86, 224, 153, 0.65)";
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = glyphs[Math.floor(Math.random() * glyphs.length)];
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }

    if (!prefersReduced) {
      raf = requestAnimationFrame(draw);
    }
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
