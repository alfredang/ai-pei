import { notFound, redirect } from "next/navigation";
import { db } from "@/db";
import { pages, redirects } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

async function getPage(slug: string) {
  const [p] = await db
    .select()
    .from(pages)
    .where(and(eq(pages.slug, slug), eq(pages.status, "published")))
    .limit(1);
  return p;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return { title: "Not found" };
  return {
    title: page.seoTitle ?? page.title,
    description: page.seoDescription ?? page.excerpt ?? undefined,
    keywords: page.seoKeywords ?? undefined,
    alternates: page.canonicalUrl ? { canonical: page.canonicalUrl } : undefined,
    robots: page.noIndex ? { index: false } : undefined,
  };
}

export default async function CmsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Reserved top-level routes are handled by their own pages; redirects table covers WP legacy paths.
  const [redir] = await db
    .select()
    .from(redirects)
    .where(eq(redirects.fromPath, `/${slug}`))
    .limit(1);
  if (redir) redirect(redir.toPath);

  const page = await getPage(slug);
  if (!page) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Container className="max-w-3xl py-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">{page.title}</h1>
          <div
            className="prose-dark"
            dangerouslySetInnerHTML={{ __html: page.contentHtml ?? "" }}
          />
        </Container>
      </main>
      <Footer />
    </>
  );
}
