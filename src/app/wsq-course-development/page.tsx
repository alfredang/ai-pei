import type { Metadata } from "next";
import { SERVICE_PAGES } from "@/lib/service-pages";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";
import { getServicePageOverride, mergeServicePage } from "@/lib/site-settings";

const SLUG = "wsq-course-development";
const baseContent = SERVICE_PAGES[SLUG];
const PAGE_URL = `https://www.tertiaryinfotech.edu.sg/${SLUG}`;

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const override = await getServicePageOverride(SLUG);
  const content = mergeServicePage(baseContent, override);
  return {
    title: content.meta.title,
    description: content.meta.description,
    alternates: { canonical: PAGE_URL },
    openGraph: {
      type: "website",
      locale: "en_SG",
      url: PAGE_URL,
      title: content.meta.title,
      description: content.meta.description,
      siteName: "Tertiary Infotech Academy",
      images: [{ url: "/icon-192.png", width: 192, height: 192, alt: "Tertiary Infotech Academy" }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
      images: ["/icon-192.png"],
    },
  };
}

export default async function Page() {
  const override = await getServicePageOverride(SLUG);
  const content = mergeServicePage(baseContent, override);
  return <ServicePageTemplate content={content} />;
}
