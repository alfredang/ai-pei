import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { media } from "@/db/schema";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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
