import type { Metadata } from "next";
import { SERVICE_PAGES } from "@/lib/service-pages";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";

const content = SERVICE_PAGES["tpqa-consultancy"];
const PAGE_URL = `https://www.tertiaryinfotech.com/${content.slug}`;

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: PAGE_URL,
    title: content.meta.title,
    description: content.meta.description,
    siteName: "Tertiary Infotech",
  },
  twitter: {
    card: "summary_large_image",
    title: content.meta.title,
    description: content.meta.description,
  },
};

export default function Page() {
  return <ServicePageTemplate content={content} />;
}
