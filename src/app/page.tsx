export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/HomeHero";
import { ValueProps } from "@/components/sections/ValueProps";
import { WhyChooseInstitute } from "@/components/sections/WhyChooseInstitute";
import { FeaturedCourse } from "@/components/sections/FeaturedCourse";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { TrainersSection } from "@/components/sections/TrainersSection";
import { AdmissionsSection } from "@/components/sections/AdmissionsSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { ContactForm } from "@/components/sections/ContactForm";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Advanced Certificate Courses in Cyber Security, AI & Blockchain in Singapore | Tertiary Infotech Academy",
  description:
    "Tertiary Infotech Academy is a Singapore Private Education Institution (PEI) offering hands-on Advanced Certificate courses in Cyber Security, AI and Blockchain — industry-recognised, CompTIA-aligned training for international students and career switchers. WSQ funding available for eligible Singaporeans.",
  keywords:
    "Advanced Certificate Singapore, cyber security course Singapore, AI course Singapore, blockchain course Singapore, study cyber security in Singapore, study AI in Singapore international students, CompTIA A+, Security+, CySA+, PenTest+, PEI Singapore, Tertiary Infotech Academy",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Advanced Certificate Courses in Cyber Security, AI & Blockchain | Tertiary Infotech Academy",
    description:
      "Study Advanced Certificate courses in Cyber Security, AI and Blockchain at a Singapore Private Education Institution — built for international students and career switchers.",
    locale: "en_SG",
    siteName: "Tertiary Infotech Academy",
    images: [{ url: "/images/hero-classroom.png", width: 1200, height: 630, alt: "Tertiary Infotech Academy — Advanced Certificate Courses in Singapore" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Advanced Certificate Courses in Cyber Security, AI & Blockchain | Tertiary Infotech Academy",
    description:
      "Hands-on Advanced Certificate courses in Cyber Security, AI and Blockchain — study in Singapore as an international student or career switcher.",
    images: ["/images/hero-classroom.png"],
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HomeHero />
        <ValueProps />
        <WhyChooseInstitute />
        <FeaturedCourse />
        <StatsStrip />
        <TrainersSection />
        <AdmissionsSection />
        <CTABanner />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
