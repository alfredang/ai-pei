"use client";

import { useEffect, useRef } from "react";
import { LAND_COLS, LAND_ROWS, LAND_MASK_B64 } from "@/lib/globe-land";

type Vec = [number, number, number];

/** Network nodes — Singapore is the hub every other city links back to. */
const CITIES: Record<string, [number, number]> = {
  singapore: [1.35, 103.82],
  london: [51.51, -0.13],
  newYork: [40.71, -74.0],
  sanFrancisco: [37.77, -122.42],
  toronto: [43.65, -79.38],
  mexicoCity: [19.43, -99.13],
  saoPaulo: [-23.55, -46.63],
  frankfurt: [50.11, 8.68],
  moscow: [55.75, 37.62],
  cairo: [30.04, 31.24],
  lagos: [6.52, 3.38],
  nairobi: [-1.29, 36.82],
  johannesburg: [-26.2, 28.05],
  dubai: [25.2, 55.27],
  mumbai: [19.08, 72.88],
  dhaka: [23.81, 90.41],
  beijing: [39.9, 116.4],
  seoul: [37.57, 126.98],
  tokyo: [35.68, 139.69],
  manila: [14.6, 120.98],
  hoChiMinh: [10.82, 106.63],
  jakarta: [-6.2, 106.85],
  sydney: [-33.87, 151.21],
};

const ROUTES: [string, string][] = [
  ...Object.keys(CITIES)
    .filter((c) => c !== "singapore")
    .map((c) => ["singapore", c] as [string, string]),
  ["london", "newYork"],
  ["newYork", "sanFrancisco"],
  ["sanFrancisco", "tokyo"],
  ["sanFrancisco", "sydney"],
  ["toronto", "london"],
  ["newYork", "saoPaulo"],
  ["mexicoCity", "saoPaulo"],
  ["london", "lagos"],
  ["frankfurt", "moscow"],
  ["frankfurt", "beijing"],
  ["cairo", "dubai"],
  ["dubai", "mumbai"],
  ["lagos", "johannesburg"],
  ["tokyo", "seoul"],
  ["beijing", "manila"],
];

const TILT = 0.28; // radians — leans the north pole towards the viewer
const SPIN = 0.11; // radians / second
const PULSE_SPEED = 2.1; // radians of arc / second
const TAIL = 0.5; // radians of arc behind each pulse head
const ARC_SAMPLES = 64;
const DEG = Math.PI / 180;

/** Satellite orbits, as two orthonormal axes (u, w) and a radius in globe units. */
function orbit(azimuth: number, inclination: number, radius: number) {
  const a = Math.cos(azimuth), b = Math.sin(azimuth);
  const c = Math.cos(inclination), s = Math.sin(inclination);
  return { u: [a, 0, b] as Vec, w: [-b * c, s, a * c] as Vec, radius };
}
const ORBITS = [orbit(0, 65 * DEG, 1.12), orbit(50 * DEG, -28 * DEG, 1.2)];

/** Lat/long grid lines — meridians every 30°, parallels every 30°. */
function graticule(): { pts: Vec[]; equator: boolean }[] {
  const lines: { pts: Vec[]; equator: boolean }[] = [];
  for (let lon = -180; lon < 180; lon += 30) {
    const pts: Vec[] = [];
    for (let lat = -90; lat <= 90; lat += 5) pts.push(toVec(lat, lon));
    lines.push({ pts, equator: false });
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    const pts: Vec[] = [];
    for (let lon = -180; lon <= 180; lon += 5) pts.push(toVec(lat, lon));
    lines.push({ pts, equator: lat === 0 });
  }
  return lines;
}

function toVec(lat: number, lon: number): Vec {
  const p = (lat * Math.PI) / 180;
  const l = (lon * Math.PI) / 180;
  return [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)];
}

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

/** Land cells as unit vectors, thinned towards the poles so dot density stays even. */
function landPoints(): Vec[] {
  const bin = atob(LAND_MASK_B64);
  const pts: Vec[] = [];
  for (let r = 0; r < LAND_ROWS; r++) {
    const lat = 89 - r * 2;
    const step = Math.max(1, Math.round(1 / Math.cos((lat * Math.PI) / 180)));
    for (let c = 0; c < LAND_COLS; c += step) {
      const i = r * LAND_COLS + c;
      if ((bin.charCodeAt(i >> 3) >> (i & 7)) & 1) pts.push(toVec(lat, -179 + c * 2));
    }
  }
  return pts;
}

/** Great-circle arc between two cities, lifted off the surface in the middle. */
function arcPoints(a: Vec, b: Vec) {
  const angle = Math.acos(Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const lift = 0.04 + 0.18 * (angle / Math.PI);
  const sinA = Math.sin(angle);
  const pts: Vec[] = [];
  for (let i = 0; i <= ARC_SAMPLES; i++) {
    const t = i / ARC_SAMPLES;
    const wa = Math.sin((1 - t) * angle) / sinA;
    const wb = Math.sin(t * angle) / sinA;
    const h = 1 + lift * Math.sin(Math.PI * t);
    pts.push([(a[0] * wa + b[0] * wb) * h, (a[1] * wa + b[1] * wb) * h, (a[2] * wa + b[2] * wb) * h]);
  }
  return { pts, angle };
}

/**
 * Rotating dotted Earth with light pulses racing along fibre routes between
 * cities — one colour per discipline. Canvas 2D, no dependencies; pauses when
 * off-screen and renders a single still frame under prefers-reduced-motion.
 */
export function FiberGlobe({ colors }: { colors: string[] }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rgb = colors.map(hexToRgb);
    const land = landPoints();
    const cities = Object.fromEntries(
      Object.entries(CITIES).map(([k, [lat, lon]]) => [k, toVec(lat, lon)]),
    );
    // Every route runs both ways so light flows into Singapore as well as out
    const routes = ROUTES.flatMap(([a, b]) => [[a, b], [b, a]]).map(([from, to]) => ({
      ...arcPoints(cities[from], cities[to]),
      to,
    }));
    const grid = graticule();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let size = 0, cx = 0, cy = 0, R = 0;
    // Start with Singapore facing the viewer
    let spin = -(CITIES.singapore[1] * Math.PI) / 180;

    type Pulse = { route: number; d: number; color: number };
    type Flash = { city: string; age: number; color: number };
    let pulses: Pulse[] = [];
    let flashes: Flash[] = [];
    let spawnAcc = 0;
    let time = 0;
    let packets = 0;

    function setup() {
      const rect = parent!.getBoundingClientRect();
      size = Math.max(1, Math.min(rect.width, rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(size * dpr);
      canvas!.height = Math.floor(size * dpr);
      canvas!.style.width = `${size}px`;
      canvas!.style.height = `${size}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = cy = size / 2;
      R = size * 0.36; // leaves room for the HUD rings
    }

    // Rotate (spin around Y, then tilt around X) and project orthographically.
    // Returns [screenX, screenY, depth, onFrontHemisphere].
    let cosS = 1, sinS = 0;
    const cosT = Math.cos(TILT), sinT = Math.sin(TILT);
    function project(v: Vec): [number, number, number, boolean] {
      const x = v[0] * cosS + v[2] * sinS;
      const z1 = -v[0] * sinS + v[2] * cosS;
      const y = v[1] * cosT - z1 * sinT;
      const z = v[1] * sinT + z1 * cosT;
      const sx = cx + x * R;
      const sy = cy - y * R;
      return [sx, sy, z, z > 0];
    }

    // Same, but without the spin — for things that don't turn with the Earth
    // (orbits). Hidden only where the globe actually covers them.
    function projectFixed(v: Vec): [number, number, boolean] {
      const y = v[1] * cosT - v[2] * sinT;
      const z = v[1] * sinT + v[2] * cosT;
      return [cx + v[0] * R, cy - y * R, z > 0 || v[0] * v[0] + y * y > 1];
    }

    function polyline(pts: Vec[], style: string, width: number) {
      strokeArc(pts, 0, pts.length - 1, style, width);
    }

    function drawHud() {
      const ring = (r: number, a0: number, a1: number) => {
        ctx!.beginPath();
        ctx!.arc(cx, cy, r, a0, a1);
        ctx!.stroke();
      };
      // Inner tick ring, slowly turning
      const rT = R * 1.16;
      const rotT = time * 0.05;
      ctx!.strokeStyle = "rgba(60,224,124,0.18)";
      ctx!.lineWidth = 1;
      ring(rT, 0, Math.PI * 2);
      ctx!.beginPath();
      for (let i = 0; i < 120; i++) {
        const a = rotT + (i / 120) * Math.PI * 2;
        const len = i % 10 === 0 ? R * 0.05 : R * 0.018;
        ctx!.moveTo(cx + Math.cos(a) * rT, cy + Math.sin(a) * rT);
        ctx!.lineTo(cx + Math.cos(a) * (rT + len), cy + Math.sin(a) * (rT + len));
      }
      ctx!.stroke();
      // Counter-rotating bracket segments
      const rB = R * 1.25;
      const rotB = -time * 0.18;
      ctx!.strokeStyle = "rgba(60,224,124,0.55)";
      ctx!.lineWidth = 1.6;
      for (let k = 0; k < 3; k++) {
        const a = rotB + (k * Math.PI * 2) / 3;
        ring(rB, a, a + 0.55);
      }
      ctx!.strokeStyle = "rgba(45,212,191,0.35)";
      ctx!.lineWidth = 3;
      for (let k = 0; k < 3; k++) {
        const a = rotB + (k * Math.PI * 2) / 3 + 0.62;
        ring(rB, a, a + 0.08);
      }
      // Outer dashed ring
      ctx!.setLineDash([2, 7]);
      ctx!.lineDashOffset = -time * 12;
      ctx!.strokeStyle = "rgba(205,255,215,0.22)";
      ctx!.lineWidth = 1;
      ring(R * 1.33, 0, Math.PI * 2);
      ctx!.setLineDash([]);
    }

    function drawOrbits(front: boolean) {
      for (let o = 0; o < ORBITS.length; o++) {
        const { u, w, radius } = ORBITS[o];
        const at = (t: number): Vec => [
          radius * (Math.cos(t) * u[0] + Math.sin(t) * w[0]),
          radius * (Math.cos(t) * u[1] + Math.sin(t) * w[1]),
          radius * (Math.cos(t) * u[2] + Math.sin(t) * w[2]),
        ];
        // Path: back half drawn before the globe, front half after
        ctx!.strokeStyle = "rgba(60,224,124,0.22)";
        ctx!.lineWidth = 0.8;
        ctx!.beginPath();
        let pen = false;
        for (let i = 0; i <= 128; i++) {
          const [x, y, vis] = projectFixed(at((i / 128) * Math.PI * 2));
          const show = front ? vis : !vis;
          if (!show) { pen = false; continue; }
          if (pen) ctx!.lineTo(x, y);
          else { ctx!.moveTo(x, y); pen = true; }
        }
        ctx!.stroke();
        if (!front) continue;
        // Satellite with a short light trail
        const t0 = time * (o ? -0.42 : 0.55) + o * 2;
        for (let k = 0; k < 10; k++) {
          const [x, y, vis] = projectFixed(at(t0 - k * 0.025 * (o ? -1 : 1)));
          if (!vis) continue;
          ctx!.fillStyle = `rgba(205,255,215,${(1 - k / 10).toFixed(3)})`;
          ctx!.beginPath();
          ctx!.arc(x, y, k ? 1.4 : 2.6, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
    }

    function strokeArc(pts: Vec[], from: number, to: number, style: string, width: number) {
      ctx!.strokeStyle = style;
      ctx!.lineWidth = width;
      ctx!.beginPath();
      let pen = false;
      for (let i = from; i <= to; i++) {
        const [x, y, , vis] = project(pts[i]);
        if (!vis) { pen = false; continue; }
        if (pen) ctx!.lineTo(x, y);
        else { ctx!.moveTo(x, y); pen = true; }
      }
      ctx!.stroke();
    }

    function draw(dt: number) {
      cosS = Math.cos(spin);
      sinS = Math.sin(spin);
      ctx!.clearRect(0, 0, size, size);

      // Atmosphere glow
      const atmo = ctx!.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.28);
      atmo.addColorStop(0, "rgba(60,224,124,0.28)");
      atmo.addColorStop(1, "rgba(60,224,124,0)");
      ctx!.fillStyle = atmo;
      ctx!.fillRect(0, 0, size, size);

      drawHud();
      drawOrbits(false);

      // Ocean body — opaque so the matrix rain doesn't show through
      const body = ctx!.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      body.addColorStop(0, "#0f3d26");
      body.addColorStop(1, "#03100A");
      ctx!.fillStyle = body;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.strokeStyle = "rgba(60,224,124,0.35)";
      ctx!.lineWidth = 1;
      ctx!.stroke();

      // Holographic lat/long grid
      for (const g of grid) {
        polyline(g.pts, g.equator ? "rgba(45,212,191,0.28)" : "rgba(60,224,124,0.09)", g.equator ? 1 : 0.7);
      }

      // Continents as phosphor dots
      const dot = Math.max(1.6, R / 105);
      for (const p of land) {
        const [x, y, z] = project(p);
        if (z <= 0) continue;
        ctx!.fillStyle = `rgba(60,224,124,${(0.3 + 0.7 * z).toFixed(3)})`;
        ctx!.fillRect(x - dot / 2, y - dot / 2, dot, dot);
      }

      ctx!.globalCompositeOperation = "lighter";

      // Holographic scan: fine scanlines plus a bright band sweeping down
      ctx!.save();
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.clip();
      ctx!.fillStyle = "rgba(60,224,124,0.035)";
      for (let y = cy - R; y < cy + R; y += 3) ctx!.fillRect(cx - R, y, R * 2, 1);
      const bandY = cy - R * 1.3 + ((time / 4) % 1) * R * 2.6;
      const band = ctx!.createLinearGradient(0, bandY - R * 0.18, 0, bandY + R * 0.02);
      band.addColorStop(0, "rgba(60,224,124,0)");
      band.addColorStop(0.85, "rgba(60,224,124,0.14)");
      band.addColorStop(1, "rgba(205,255,215,0.35)");
      ctx!.fillStyle = band;
      ctx!.fillRect(cx - R, bandY - R * 0.18, R * 2, R * 0.2);
      ctx!.restore();

      // Faint fibre routes
      for (const r of routes) strokeArc(r.pts, 0, ARC_SAMPLES, "rgba(60,224,124,0.12)", 1);

      // Light pulses
      if (!reduced) {
        spawnAcc += dt * 16;
        while (spawnAcc >= 1 && pulses.length < 64) {
          spawnAcc -= 1;
          pulses.push({
            route: Math.floor(Math.random() * routes.length),
            d: 0,
            color: Math.floor(Math.random() * rgb.length),
          });
        }
        spawnAcc = Math.min(spawnAcc, 1);
      }
      const next: Pulse[] = [];
      for (const p of pulses) {
        const r = routes[p.route];
        p.d += PULSE_SPEED * dt;
        const head = Math.min(1, p.d / r.angle);
        const tail = Math.max(0, (p.d - TAIL) / r.angle);
        if (tail >= 1) continue;
        if (head === 1 && (p.d - PULSE_SPEED * dt) / r.angle < 1) {
          flashes.push({ city: r.to, age: 0, color: p.color });
          packets++;
          if (counterRef.current) counterRef.current.textContent = String(packets).padStart(6, "0");
        }
        next.push(p);
        const hi = Math.round(head * ARC_SAMPLES);
        const lo = Math.round(tail * ARC_SAMPLES);
        if (hi <= lo) continue;
        // Tail fades in towards the head: draw it in a few graded chunks
        const chunks = 4;
        for (let k = 0; k < chunks; k++) {
          const a = lo + Math.floor(((hi - lo) * k) / chunks);
          const b = lo + Math.floor(((hi - lo) * (k + 1)) / chunks);
          if (b <= a) continue;
          const f = (k + 1) / chunks;
          strokeArc(r.pts, a, b, `rgba(${rgb[p.color]},${(0.18 * f).toFixed(3)})`, 6);
          strokeArc(r.pts, a, b, `rgba(${rgb[p.color]},${(0.95 * f).toFixed(3)})`, 2);
        }
        if (head < 1) {
          const [x, y, , vis] = project(r.pts[hi]);
          if (vis) {
            ctx!.fillStyle = `rgba(${rgb[p.color]},1)`;
            ctx!.shadowColor = `rgba(${rgb[p.color]},1)`;
            ctx!.shadowBlur = 12;
            ctx!.beginPath();
            ctx!.arc(x, y, 2.6, 0, Math.PI * 2);
            ctx!.fill();
            ctx!.shadowBlur = 0;
          }
        }
      }
      pulses = next;

      // Arrival: a light beam shoots up off the surface, plus a ripple
      flashes = flashes.filter((f) => (f.age += dt) < 0.8);
      for (const f of flashes) {
        const v = cities[f.city];
        const [x, y, z] = project(v);
        if (z <= 0) continue;
        const life = 1 - f.age / 0.8;
        const h = 1 + 0.16 * Math.min(1, f.age / 0.15);
        const [bx, by] = project([v[0] * h, v[1] * h, v[2] * h]);
        const beam = ctx!.createLinearGradient(x, y, bx, by);
        beam.addColorStop(0, `rgba(${rgb[f.color]},${(0.95 * life).toFixed(3)})`);
        beam.addColorStop(1, `rgba(${rgb[f.color]},0)`);
        ctx!.strokeStyle = beam;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.moveTo(x, y);
        ctx!.lineTo(bx, by);
        ctx!.stroke();
        ctx!.strokeStyle = `rgba(${rgb[f.color]},${(0.9 * (1 - f.age / 0.8)).toFixed(3)})`;
        ctx!.lineWidth = 1.2;
        ctx!.beginPath();
        ctx!.arc(x, y, 2 + f.age * 14, 0, Math.PI * 2);
        ctx!.stroke();
      }

      drawOrbits(true);
      ctx!.globalCompositeOperation = "source-over";

      // City nodes
      for (const [name, v] of Object.entries(cities)) {
        const [x, y, z] = project(v);
        if (z <= 0) continue;
        ctx!.fillStyle = `rgba(205,255,215,${(0.4 + 0.6 * z).toFixed(3)})`;
        ctx!.beginPath();
        ctx!.arc(x, y, name === "singapore" ? 3.2 : 1.8, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Singapore hub beacon + label
      const [sx, sy, sz] = project(cities.singapore);
      if (sz > 0) {
        const phase = (time / 1.6) % 1;
        ctx!.strokeStyle = `rgba(60,224,124,${(0.8 * (1 - phase)).toFixed(3)})`;
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        ctx!.arc(sx, sy, 4 + phase * 16, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.font = `600 ${Math.max(9, Math.round(size / 55))}px "JetBrains Mono", ui-monospace, monospace`;
        ctx!.fillStyle = `rgba(205,255,215,${Math.min(1, sz * 1.6).toFixed(3)})`;
        ctx!.fillText("SINGAPORE", sx + 9, sy + 4);
      }
    }

    setup();

    let raf = 0;
    let last = 0;
    let running = false;
    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      spin += SPIN * dt;
      time += dt;
      draw(dt);
    }
    function start() {
      if (running || reduced) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    if (reduced) draw(0);

    // Only animate while the hero is on screen
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      setup();
      if (!running) draw(0);
    });
    ro.observe(parent);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
    };
  }, [colors]);

  const corner = "absolute h-5 w-5 border-(--color-cyan)/60";
  return (
    <>
      <canvas ref={ref} className="block" aria-hidden />
      {/* HUD frame — corner brackets and mono readouts */}
      <div
        className="pointer-events-none absolute inset-0 font-mono text-[10px] uppercase tracking-[0.2em] text-(--color-cyan)/75"
        aria-hidden
      >
        <span className={`${corner} left-0 top-0 border-l border-t`} />
        <span className={`${corner} right-0 top-0 border-r border-t`} />
        <span className={`${corner} bottom-0 left-0 border-b border-l`} />
        <span className={`${corner} bottom-0 right-0 border-b border-r`} />
        <div className="absolute left-7 top-1.5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-(--color-cyan) shadow-[0_0_8px_var(--color-cyan)] animate-pulse" />
          Global tech grid · live
        </div>
        <div className="absolute right-7 top-1.5 hidden text-right sm:block">4 disciplines · 1 launchpad</div>
        <div className="absolute bottom-1.5 left-7 hidden sm:block">Hub 01.35°N 103.82°E</div>
        <div className="absolute bottom-1.5 right-7 text-right">
          Packets <span ref={counterRef} className="text-white/90">000000</span>
        </div>
      </div>
    </>
  );
}
