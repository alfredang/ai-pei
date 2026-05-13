import { notFound } from "next/navigation";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

function stripLeadingImage(html: string, featuredImage: string | null | undefined): string {
  if (!html) return "";
  const match = html.match(/^\s*(?:<p[^>]*>\s*)?<img[^>]*src=["']([^"']+)["'][^>]*>\s*(?:<\/p>)?/i);
  if (!match) return html;
  const src = match[1];
  if (featuredImage && src !== featuredImage) return html;
  return html.slice(match[0].length);
}

function splitIntroSection(html: string): { intro: string; rest: string } {
  if (!html) return { intro: "", rest: "" };
  // Prefer splitting at the second heading. If only one heading exists, split
  // at the first heading that follows a paragraph. Otherwise pull the first
  // paragraph as the intro/overview.
  const headingRe = /<h[1-6][^>]*>/gi;
  const headings = [...html.matchAll(headingRe)];
  if (headings.length >= 2) {
    const splitAt = headings[1].index ?? 0;
    return { intro: html.slice(0, splitAt), rest: html.slice(splitAt) };
  }
  // Take the first paragraph (and any preceding heading) as intro.
  const firstP = html.match(/<p[^>]*>[\s\S]*?<\/p>/i);
  if (firstP && firstP.index !== undefined) {
    const end = firstP.index + firstP[0].length;
    return { intro: html.slice(0, end), rest: html.slice(end) };
  }
  return { intro: "", rest: html };
}

async function getPost(slug: string) {
  const [p] = await db
    .select()
    .from(posts)
    .where(and(eq(posts.slug, slug), eq(posts.status, "published")))
    .limit(1);
  return p;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt ?? undefined,
    keywords: post.seoKeywords ?? undefined,
    alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
    robots: post.noIndex ? { index: false } : undefined,
    openGraph: {
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt ?? undefined,
      images: post.ogImage ? [post.ogImage] : post.featuredImage ? [post.featuredImage] : undefined,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const bodyHtml = stripLeadingImage(post.contentHtml ?? "", post.featuredImage);
  const { intro: introHtml, rest: restHtml } = splitIntroSection(bodyHtml);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription ?? post.excerpt,
    datePublished: post.publishedAt?.toISOString(),
    image: post.featuredImage,
  };

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <article className="py-6">
          <Container className="max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8 items-start mb-6">
              {post.featuredImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full rounded-xl border border-white/10"
                />
              )}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
                  {post.title}
                </h1>
                {post.publishedAt && (
                  <p className="text-white/50 text-sm mb-4">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                )}
                {post.excerpt && (
                  <p className="text-white/75 text-base leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                )}
                {introHtml && (
                  <div
                    className="prose-dark"
                    dangerouslySetInnerHTML={{ __html: introHtml }}
                  />
                )}
              </div>
            </div>
            <div
              className="prose-dark"
              dangerouslySetInnerHTML={{ __html: restHtml }}
            />
          </Container>
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
