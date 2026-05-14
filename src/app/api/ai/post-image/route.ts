/**
 * Given a short image-search query (typically from `generate_full_post`'s
 * `imageQuery` field), find a relevant image via Tavily, upload it to R2,
 * and return the public URL. Admin-only.
 */
import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequest } from "@/lib/admin-guard";
import { getCredential } from "@/lib/secrets";
import { getR2Config, uploadToR2 } from "@/lib/r2";

const schema = z.object({
  query: z.string().min(1).max(300),
  slug: z.string().min(1).max(200).optional(),
});

type TavilyImage = { url: string; description?: string };
type TavilyResponse = { images?: (string | TavilyImage)[] };

function pickExtension(contentType: string | null): string {
  if (!contentType) return ".jpg";
  if (contentType.includes("png")) return ".png";
  if (contentType.includes("webp")) return ".webp";
  if (contentType.includes("gif")) return ".gif";
  if (contentType.includes("jpeg")) return ".jpg";
  return ".jpg";
}

export async function POST(req: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const tavilyKey = await getCredential("tavily_api_key");
  if (!tavilyKey) {
    return NextResponse.json(
      { error: "Tavily API key not configured. Set it in Admin → Settings → Credentials." },
      { status: 400 },
    );
  }
  const r2 = await getR2Config();
  if (!r2) {
    return NextResponse.json(
      { error: "Cloudflare R2 not configured. Set R2 credentials in Admin → Settings → Credentials." },
      { status: 400 },
    );
  }

  try {
    const tavilyRes = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: tavilyKey,
        query: parsed.data.query,
        search_depth: "basic",
        include_images: true,
        max_results: 5,
      }),
    });
    if (!tavilyRes.ok) {
      const text = await tavilyRes.text();
      return NextResponse.json(
        { error: `Tavily search failed (${tavilyRes.status}): ${text.slice(0, 200)}` },
        { status: 502 },
      );
    }
    const tavilyData = (await tavilyRes.json()) as TavilyResponse;
    const images = tavilyData.images ?? [];
    if (images.length === 0) {
      return NextResponse.json({ error: "No images found for query" }, { status: 404 });
    }

    // Try each candidate image until one downloads successfully.
    let imageBuf: Buffer | null = null;
    let imageType = "image/jpeg";
    let imageSrcUrl = "";
    for (const item of images) {
      const url = typeof item === "string" ? item : item.url;
      if (!url) continue;
      try {
        const r = await fetch(url, {
          headers: { "User-Agent": "Mozilla/5.0 TertiaryCMS/1.0" },
          signal: AbortSignal.timeout(15000),
        });
        if (!r.ok) continue;
        const ct = r.headers.get("content-type") ?? "";
        if (!ct.startsWith("image/")) continue;
        const buf = Buffer.from(await r.arrayBuffer());
        if (buf.byteLength < 5_000) continue; // skip tiny / placeholder images
        imageBuf = buf;
        imageType = ct;
        imageSrcUrl = url;
        break;
      } catch {
        // try next candidate
      }
    }
    if (!imageBuf) {
      return NextResponse.json({ error: "Could not download any candidate image" }, { status: 502 });
    }

    const baseSlug = (parsed.data.slug || parsed.data.query)
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "post";
    const ext = pickExtension(imageType);
    const key = `blog/ai-${Date.now()}-${baseSlug}${ext}`;
    const publicUrl = await uploadToR2(r2, key, imageBuf, imageType);

    return NextResponse.json({
      ok: true,
      url: publicUrl,
      source: imageSrcUrl,
      bytes: imageBuf.byteLength,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
