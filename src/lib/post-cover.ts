/**
 * Branded SVG cover image for a blog post. See
 * .claude/skills/blog-cover-image/SKILL.md for the rules every change here
 * must respect.
 *
 * The pure SVG builder lives in src/lib/post-cover-svg.ts (no `sharp`) so the
 * /blog list and /blog/[slug] detail pages can render the same card inline as
 * a fallback. This module adds the `sharp` PNG render + R2 upload used by the
 * admin route and scripts/regenerate-post-covers.ts.
 */
import sharp from "sharp";
import { uploadToR2, type R2Config } from "@/lib/r2";
import { buildPostCoverSvg, COVER_WIDTH, COVER_HEIGHT, COVER_PADDING_X } from "@/lib/post-cover-svg";

export { buildPostCoverSvg, COVER_WIDTH, COVER_HEIGHT, COVER_PADDING_X };

/** Render the SVG → PNG and upload to R2. Returns the public URL. */
export async function renderAndUploadCover(
  r2: R2Config,
  title: string,
  slug: string,
  kicker?: string,
): Promise<{ url: string; bytes: number }> {
  const svg = buildPostCoverSvg(title, kicker);
  const png = await sharp(Buffer.from(svg)).png({ quality: 90 }).toBuffer();
  const baseSlug =
    slug
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "post";
  const key = `blog/ai-${Date.now()}-${baseSlug}.png`;
  const url = await uploadToR2(r2, key, png, "image/png");
  return { url, bytes: png.byteLength };
}
