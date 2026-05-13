import Link from "next/link";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Container } from "@/components/layout/Container";

async function loadPosts() {
  try {
    return await db
      .select()
      .from(posts)
      .where(eq(posts.status, "published"))
      .orderBy(desc(posts.publishedAt))
      .limit(3);
  } catch {
    return [];
  }
}

export async function FeaturedPosts() {
  const items = await loadPosts();
  if (items.length === 0) return null;
  return (
    <section className="py-24">
      <Container>
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">From our Blog</h2>
          <Link href="/blog" className="text-sm text-neon-cyan hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((p) => (
            <Link key={p.id} href={`/blog/${p.slug}`} className="glass rounded-2xl overflow-hidden hover:translate-y-[-2px] transition group">
              {p.featuredImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.featuredImage} alt={p.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-5">
                <h3 className="font-bold text-lg group-hover:text-neon-cyan transition">{p.title}</h3>
                {p.excerpt && <p className="text-sm text-white/70 mt-2 line-clamp-3">{p.excerpt}</p>}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
