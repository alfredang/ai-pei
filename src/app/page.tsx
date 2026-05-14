export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { AILmsTmsShowcase } from "@/components/sections/AILmsTmsShowcase";
import { ELearningShowcase } from "@/components/sections/ELearningShowcase";
import { CMSShowcase } from "@/components/sections/CMSShowcase";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { FeaturedPosts } from "@/components/sections/FeaturedPosts";
import { ContactForm } from "@/components/sections/ContactForm";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "AI LMS & TMS for WSQ, TPQA & SSG ATO Compliance | Tertiary Infotech Academy",
  description:
    "AI-powered LMS & TMS built for Singapore training providers — automate WSQ compliance, pass TPQA audits, and integrate with SSG out of the box. Book a free consultation.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "AI LMS & TMS for WSQ, TPQA & SSG ATO Compliance | Tertiary Infotech Academy",
    description:
      "AI-powered LMS & TMS for Singapore training providers — WSQ-compliant, TPQA-ready, SSG ATO-aligned. Plus bespoke software and AI consultancy.",
    locale: "en_SG",
    siteName: "Tertiary Infotech Academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI LMS & TMS for WSQ, TPQA & SSG ATO Compliance | Tertiary Infotech Academy",
    description:
      "AI-powered LMS & TMS for Singapore training providers — WSQ-compliant, TPQA-ready, SSG ATO-aligned.",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AILmsTmsShowcase />
        <ELearningShowcase />
        <CMSShowcase />
        <Services />
        <WhyChooseUs />
        <FeaturedPosts />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
