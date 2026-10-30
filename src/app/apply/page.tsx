import type { Metadata } from "next";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { courses } from "@/db/schema";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ApplyForm } from "@/components/sections/ApplyForm";

export const dynamic = "force-dynamic";

const PAGE_URL = "https://www.tertiaryinfotech.edu.sg/apply.html";

export const metadata: Metadata = {
  title: "Apply to Study in Singapore — International Student Application",
  description:
    "International students: register your interest in an Advanced Certificate in AI, Cyber Security or Blockchain at Tertiary Infotech Academy, Singapore. Tell us your programme and preferred start date.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Apply to Study in Singapore — Tertiary Infotech Academy",
    description:
      "Register your interest in an Advanced Certificate programme in Singapore. We will confirm your intake batch and send your student contract.",
    locale: "en_SG",
    siteName: "Tertiary Infotech Academy",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Tertiary Infotech Academy" }],
  },
};

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const rawRef = Array.isArray(params.ref) ? params.ref[0] : params.ref;
  const refCode = rawRef?.trim().toLowerCase().slice(0, 64) || null;

  const programs = await db
    .select({ title: courses.title })
    .from(courses)
    .where(eq(courses.status, "published"))
    .orderBy(asc(courses.sortOrder), asc(courses.title))
    .then((rows) => rows.map((r) => r.title))
    .catch(() => [] as string[]);

  return (
    <>
      <Navbar />
      <main className="relative py-20 overflow-hidden">
        <div
          className="glow-blob"
          style={{
            top: "10%",
            right: "0",
            width: 480,
            height: 480,
            background: "radial-gradient(circle, #5C00E5 0%, transparent 70%)",
          }}
        />
        <Container className="max-w-4xl relative">
          <div className="text-center mb-8">
            <div className="kicker mb-4">[ INTERNATIONAL STUDENTS ]</div>
            <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] mb-4">
              Apply to Study in <span className="gradient-text">Singapore</span>
            </h1>
            <p className="text-(--color-muted) text-lg max-w-xl mx-auto">
              Tell us which programme you are interested in and when you would like to start. Our
              admissions team will get back to you with the next steps.
            </p>
            {refCode && (
              <p className="mt-4 text-xs font-mono text-white/50">[ Referral code: {refCode} ]</p>
            )}
          </div>
          <ApplyForm programs={programs} refCode={refCode} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
