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
  title: "Blog",
  description:
    "Insights on AI, LMS, TMS, WSQ training compliance and software development from Tertiary Infotech.",
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
      <main className="pt-16">
        <Container className="py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Blog</h1>
          {items.length === 0 ? (
            <p className="text-white/60">No posts yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="glass rounded-2xl overflow-hidden hover:translate-y-[-2px] transition group"
                >
                  {p.featuredImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.featuredImage} alt={p.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-5">
                    <h3 className="font-bold text-lg group-hover:text-neon-cyan transition">
                      {p.title}
                    </h3>
                    {p.excerpt && (
                      <p className="text-sm text-white/70 mt-2 line-clamp-3">{p.excerpt}</p>
                    )}
                    {p.publishedAt && (
                      <p className="text-xs text-white/40 mt-3">
                        {new Date(p.publishedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
