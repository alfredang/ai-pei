import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { media } from "@/db/schema";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const UPLOAD_DIR = path.join(PUBLIC_DIR, "uploads");

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const asLogo = url.searchParams.get("as-logo") === "1";

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  await mkdir(UPLOAD_DIR, { recursive: true });
  const ext = path.extname(file.name) || "";
  const base = path.basename(file.name, ext).replace(/[^a-z0-9-_]/gi, "-");
  const filename = `${Date.now()}-${base}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  const publicPath = `/uploads/${filename}`;

  // When uploading as the company logo, also write the same bytes to
  // public/icon.png so Next.js auto-serves it as the favicon.
  if (asLogo) {
    try {
      await writeFile(path.join(PUBLIC_DIR, "icon.png"), buffer);
      await writeFile(path.join(PUBLIC_DIR, "apple-icon.png"), buffer);
      await writeFile(path.join(PUBLIC_DIR, "favicon.ico"), buffer);
    } catch (e) {
      console.error("[upload as-logo] favicon write failed", e);
    }
  }

  const [row] = await db
    .insert(media)
    .values({
      filename,
      path: publicPath,
      mime: file.type,
      sizeBytes: buffer.byteLength,
      uploadedById: Number(session.user.id) || null,
    })
    .returning();

  return NextResponse.json({ ok: true, media: row });
}
