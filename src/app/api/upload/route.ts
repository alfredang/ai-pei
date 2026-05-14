import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { isAdminRequest } from "@/lib/admin-guard";
import { db } from "@/db";
import { media } from "@/db/schema";
import { getR2Config, uploadToR2 } from "@/lib/r2";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const UPLOAD_DIR = path.join(PUBLIC_DIR, "uploads");

export async function POST(req: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const asLogo = url.searchParams.get("as-logo") === "1";

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const ext = path.extname(file.name) || "";
  const base = path.basename(file.name, ext).replace(/[^a-z0-9-_]/gi, "-");
  const filename = `${Date.now()}-${base}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const r2 = await getR2Config();
  let publicPath: string;

  if (r2 && !asLogo) {
    // Push to Cloudflare R2 — preferred path for content uploads.
    const key = `uploads/${filename}`;
    publicPath = await uploadToR2(r2, key, buffer, file.type);
  } else {
    // Fall back to local disk: when R2 isn't configured, or when uploading
    // as the company logo (favicons need to live in /public for Next to
    // auto-serve them at /icon.png etc.).
    await mkdir(UPLOAD_DIR, { recursive: true });
    await writeFile(path.join(UPLOAD_DIR, filename), buffer);
    publicPath = `/uploads/${filename}`;

    if (asLogo) {
      try {
        await writeFile(path.join(PUBLIC_DIR, "icon.png"), buffer);
        await writeFile(path.join(PUBLIC_DIR, "apple-icon.png"), buffer);
        await writeFile(path.join(PUBLIC_DIR, "favicon.ico"), buffer);
      } catch (e) {
        console.error("[upload as-logo] favicon write failed", e);
      }
    }
  }

  const [row] = await db
    .insert(media)
    .values({
      filename,
      path: publicPath,
      mime: file.type,
      sizeBytes: buffer.byteLength,
      uploadedById: null,
    })
    .returning();

  return NextResponse.json({ ok: true, media: row });
}
