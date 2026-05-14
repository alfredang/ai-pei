import Link from "next/link";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Container } from "@/components/layout/Container";
import { HiArrowUpRight } from "react-icons/hi2";

function snippetFromHtml(html: string | null | undefined, max = 200): string {
  if (!html) return "";
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

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
    <section className="relative py-4">
      <Container>
        <div className="flex items-end justify-between mb-6 gap-6 flex-wrap">
          <div>
            <div className="kicker mb-4">[ JOURNAL ]</div>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05]">
              From our blog
            </h2>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-mono text-(--color-cyan) hover:gap-3 transition-all">
            ALL ARTICLES <HiArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
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
                  <div className="absolute inset-0 bg-gradient-to-br from-(--color-purple)/30 to-(--color-cyan)/20" />
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                {p.publishedAt && (
                  <div className="kicker mb-3">
                    {new Date(p.publishedAt).toLocaleDateString("en-SG", { year: "numeric", month: "short", day: "2-digit" })}
                  </div>
                )}
                <h3 className="font-display font-bold text-xl text-white group-hover:text-(--color-cyan) transition mb-3">{p.title}</h3>
                {(() => {
                  const teaser = p.excerpt || snippetFromHtml(p.contentHtml);
                  return teaser ? (
                    <p className="text-sm text-(--color-muted) line-clamp-3 leading-relaxed">{teaser}</p>
                  ) : null;
                })()}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
