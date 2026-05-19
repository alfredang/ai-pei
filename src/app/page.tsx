export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { CoursesCarousel } from "@/components/sections/CoursesCarousel";
import { CMSShowcase } from "@/components/sections/CMSShowcase";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ContactForm } from "@/components/sections/ContactForm";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "AI LMS & TMS for WSQ, TPQA & SSG ATO Compliance | Tertiary Infotech Academy",
  description:
    "AI-powered LMS & TMS built for Singapore training providers — automate WSQ compliance, pass TPQA audits, and integrate with SSG out of the box. Book a free consultation.",
  keywords:
    "AI LMS Singapore, WSQ LMS, TMS for training providers, SSG ATO application Singapore, TPQA compliance Singapore, e-attendance SSG, training management system Singapore",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "AI LMS & TMS for WSQ, TPQA & SSG ATO Compliance | Tertiary Infotech Academy",
    description:
      "AI-powered LMS & TMS for Singapore training providers — WSQ-compliant, TPQA-ready, SSG ATO-aligned. Plus bespoke software and AI consultancy.",
    locale: "en_SG",
    siteName: "Tertiary Infotech Academy",
    images: [{ url: "/icon-192.png", width: 192, height: 192, alt: "Tertiary Infotech Academy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI LMS & TMS for WSQ, TPQA & SSG ATO Compliance | Tertiary Infotech Academy",
    description:
      "AI-powered LMS & TMS for Singapore training providers — WSQ-compliant, TPQA-ready, SSG ATO-aligned.",
    images: ["/icon-192.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <CoursesCarousel />
        <CMSShowcase />
        <WhyChooseUs />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
