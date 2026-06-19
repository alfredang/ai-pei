import type { MetadataRoute } from "next";
import { db } from "@/db";
import { pages, posts, courses } from "@/db/schema";
import { eq } from "drizzle-orm";
import { EDTOOLS } from "@/lib/edtools-data";
import { absoluteHtmlUrl } from "@/lib/html-url";
import { peiEducationPosts } from "@/lib/pei-education-posts";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tertiaryinfotech.edu.sg";
const url = (path: string) => absoluteHtmlUrl(BASE, path);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [allPages, allPosts, allCourses] = await Promise.all([
    db.select().from(pages).where(eq(pages.status, "published")).catch(() => []),
    db.select().from(posts).where(eq(posts.status, "published")).catch(() => []),
    db.select().from(courses).where(eq(courses.status, "published")).catch(() => []),
  ]);
  const dbPostSlugs = new Set(allPosts.map((post) => post.slug));
  const staticPostDate = new Date("2026-06-17T09:00:00.000+08:00");
  return [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/ssg-ato-application"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/pei-course-submission"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/advanced-certificate-in-ai-security-analyst"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/advanced-certificate-in-agentic-ai-coding"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/advanced-certificate-in-blockchain"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/courses/advanced-certificate-in-ai-audit-and-assurance"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/study-in-singapore"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/training-management-system"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/learning-management-system"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/ai-solutions"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/wsq-course-development"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/tpqa-consultancy"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/content-management-system"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/hr-management-system"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/ai-agent-deployment"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/contact"), changeFrequency: "monthly", priority: 0.7 },
    { url: url("/real-clients"), changeFrequency: "monthly", priority: 0.7 },
    { url: url("/ai-chatbot-portfolio"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/blog"), changeFrequency: "daily", priority: 0.8 },
    { url: url("/blog/tags"), changeFrequency: "weekly", priority: 0.5 },
    { url: url("/courses"), changeFrequency: "weekly", priority: 0.8 },
    { url: url("/edtools"), changeFrequency: "monthly", priority: 0.8 },
    ...EDTOOLS.map((t) => ({
      url: url(`/edtools/${t.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: url("/terms"), changeFrequency: "yearly", priority: 0.3 },
    { url: url("/privacy"), changeFrequency: "yearly", priority: 0.3 },
    ...allPages.map((p) => ({
      url: url(`/${p.slug}`),
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...allPosts.map((p) => ({
      url: url(`/blog/${p.slug}`),
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...peiEducationPosts
      .filter((p) => !dbPostSlugs.has(p.slug))
      .map((p) => ({
        url: `${BASE}/blog/${p.slug}`,
        lastModified: staticPostDate,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    ...allCourses.map((c) => ({
      url: url(`/courses/${c.slug}`),
      lastModified: c.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
