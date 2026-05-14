import type { MetadataRoute } from "next";
import { db } from "@/db";
import { pages, posts } from "@/db/schema";
import { eq } from "drizzle-orm";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tertiaryinfotech.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [allPages, allPosts] = await Promise.all([
    db.select().from(pages).where(eq(pages.status, "published")).catch(() => []),
    db.select().from(posts).where(eq(posts.status, "published")).catch(() => []),
  ]);
  return [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/ssg-ato-application`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/blog`, changeFrequency: "daily", priority: 0.8 },
    ...allPages.map((p) => ({
      url: `${BASE}/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...allPosts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
