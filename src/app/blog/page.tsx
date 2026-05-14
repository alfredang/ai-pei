import Link from "next/link";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Insights on AI, LMS, TMS, WSQ training compliance and software development from Tertiary Infotech.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "Journal | Tertiary Infotech",
    description:
      "Engineering deep-dives, WSQ compliance walkthroughs, and case studies from the Tertiary Infotech team.",
    locale: "en_SG",
    siteName: "Tertiary Infotech Academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Journal | Tertiary Infotech",
    description:
      "Insights on AI, LMS, TMS, WSQ training compliance and software development.",
  },
};

export default async function BlogIndex() {
  const items = await db
    .select()
    .from(posts)
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.publishedAt));

  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-24 pb-12 overflow-hidden">
          <div className="grid-bg opacity-60" />
          <div className="glow-blob" style={{ top: "-30%", left: "20%", width: 500, height: 500, background: "radial-gradient(circle, #5C00E5 0%, transparent 70%)" }} />
          <Container className="relative">
            <div className="kicker mb-4">[ JOURNAL ]</div>
            <h1 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-[1.15]">
              Field notes from SSG and AI services and{" "}
              <span className="gradient-text">building Agentic AI workflows</span>.
            </h1>
            <p className="mt-5 text-(--color-muted) text-lg max-w-2xl">
              AI Agents, LMS and TMS case studies from the Tertiary Infotech Academy.
            </p>
          </Container>
        </section>

        <section className="pb-24">
          <Container>
            {items.length === 0 ? (
              <p className="text-(--color-muted) font-mono">[ NO POSTS YET ]</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((p) => (
                  <Link
                    key={p.id}
                    href={`/blog/${p.slug}`}
                    className="card-hover glass overflow-hidden flex flex-col group"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-(--color-bg-deeper) relative">
                      {p.featuredImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.featuredImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-(--color-purple)/30 to-(--color-cyan)/20 flex items-center justify-center">
                          <span className="font-mono text-xs text-white/30">{p.slug}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      {p.publishedAt && (
                        <div className="kicker mb-3">
                          {new Date(p.publishedAt).toLocaleDateString("en-SG", { year: "numeric", month: "short", day: "2-digit" })}
                        </div>
                      )}
                      <h3 className="font-display font-bold text-lg text-white group-hover:text-(--color-cyan) transition mb-2 leading-tight">{p.title}</h3>
                      {p.excerpt && <p className="text-sm text-(--color-muted) line-clamp-3 leading-relaxed">{p.excerpt}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
