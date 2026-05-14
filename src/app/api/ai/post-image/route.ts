/**
 * Generate a simple branded cover image for a blog post and upload it to R2.
 * No external image search — just an SVG card rendered server-side via
 * sharp. Fast, free, deterministic, on-brand.
 */
import { NextResponse } from "next/server";
import { z } from "zod";
import sharp from "sharp";
import { isAdminRequest } from "@/lib/admin-guard";
import { getR2Config, uploadToR2 } from "@/lib/r2";

const schema = z.object({
  /** Short phrase to render as the cover headline. Typically the post title or imageQuery. */
  query: z.string().min(1).max(300),
  slug: z.string().min(1).max(200).optional(),
  /** Optional small text above the headline (e.g. "Insight", "Tutorial"). */
  kicker: z.string().max(60).optional(),
});

const WIDTH = 1200;
const HEIGHT = 630;

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Break a title into up to 3 lines, ~26 chars per line. */
function wrapTitle(title: string, maxCharsPerLine = 26, maxLines = 3): string[] {
  const words = title.trim().split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    if (lines.length >= maxLines) break;
    const candidate = current ? `${current} ${w}` : w;
    if (candidate.length > maxCharsPerLine && current) {
      lines.push(current);
      current = w;
    } else {
      current = candidate;
    }
  }
  if (current && lines.length < maxLines) lines.push(current);
  // If title is longer than what fits, ellipsis the last line.
  const consumed = lines.join(" ").split(/\s+/).length;
  if (consumed < words.length) {
    const last = lines.pop() ?? "";
    lines.push(`${last.replace(/[.,;:!?]+$/, "")}…`);
  }
  return lines;
}

function buildSvg(title: string, kicker?: string): string {
  const lines = wrapTitle(title);
  const lineHeight = 84;
  const totalTextHeight = lines.length * lineHeight;
  const startY = (HEIGHT - totalTextHeight) / 2 + 60;

  const titleTspans = lines
    .map((line, i) => `<tspan x="80" dy="${i === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`)
    .join("");

  const kickerEl = kicker
    ? `<text x="80" y="${startY - 60}" fill="#59EBFD" font-family="JetBrains Mono, Menlo, monospace" font-size="20" letter-spacing="4">[ ${escapeXml(kicker.toUpperCase())} ]</text>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0118"/>
      <stop offset="50%" stop-color="#1a0533"/>
      <stop offset="100%" stop-color="#020611"/>
    </linearGradient>
    <radialGradient id="glow1" cx="20%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#5C00E5" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#5C00E5" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="85%" cy="80%" r="55%">
      <stop offset="0%" stop-color="#59EBFD" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#59EBFD" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#59EBFD" stroke-width="0.5" stroke-opacity="0.08"/>
    </pattern>
    <linearGradient id="text" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#cbd5ff"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow1)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow2)"/>
  <line x1="0" y1="0" x2="${WIDTH}" y2="0" stroke="#59EBFD" stroke-width="2" stroke-opacity="0.4"/>
  ${kickerEl}
  <text x="80" y="${startY}" fill="url(#text)" font-family="Inter, -apple-system, system-ui, sans-serif" font-size="68" font-weight="800" letter-spacing="-1.5">
    ${titleTspans}
  </text>
  <g transform="translate(80, ${HEIGHT - 70})">
    <rect width="48" height="48" rx="8" fill="url(#glow1)" stroke="#5C00E5" stroke-opacity="0.6"/>
    <text x="24" y="32" fill="#ffffff" font-family="JetBrains Mono, monospace" font-size="20" font-weight="700" text-anchor="middle">TI</text>
    <text x="68" y="22" fill="#ffffff" font-family="Inter, sans-serif" font-size="18" font-weight="600">Tertiary Infotech Academy</text>
    <text x="68" y="42" fill="#59EBFD" font-family="JetBrains Mono, monospace" font-size="13" letter-spacing="1.5">tertiaryinfotech.com</text>
  </g>
</svg>`;
}

export async function POST(req: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const r2 = await getR2Config();
  if (!r2) {
    return NextResponse.json(
      { error: "Cloudflare R2 not configured. Set R2 credentials in Admin → Settings → Credentials." },
      { status: 400 },
    );
  }

  try {
    const svg = buildSvg(parsed.data.query, parsed.data.kicker);
    const png = await sharp(Buffer.from(svg)).png({ quality: 90 }).toBuffer();

    const baseSlug = (parsed.data.slug || parsed.data.query)
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "post";
    const key = `blog/ai-${Date.now()}-${baseSlug}.png`;
    const publicUrl = await uploadToR2(r2, key, png, "image/png");

    return NextResponse.json({ ok: true, url: publicUrl, bytes: png.byteLength });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
