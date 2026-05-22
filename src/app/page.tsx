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
  title: "Advanced Certificate in Cyber Security | Tertiary Infotech Academy — WSQ & IBF ATO",
  description:
    "Tertiary Infotech Academy is a WSQ & IBF Approved Training Organisation and registered PEI offering the Advanced Certificate in Cyber Security — 4 stackable CompTIA modules with up to 70% WSQ funding.",
  keywords:
    "Tertiary Infotech Academy, Advanced Certificate in Cyber Security, WSQ Cyber Security Singapore, CompTIA A+, Security+, Linux+, CySA+, PenTest+, SkillsFuture Credit, PEI Singapore, cybersecurity training",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Advanced Certificate in Cyber Security | Tertiary Infotech Academy",
    description:
      "WSQ & IBF Approved Training Organisation offering the Advanced Certificate in Cyber Security — up to 70% government funding. SkillsFuture Credit claimable.",
    locale: "en_SG",
    siteName: "Tertiary Infotech Academy",
    images: [{ url: "/images/hero-classroom.png", width: 1200, height: 630, alt: "Cyber Security Training Classroom" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Advanced Certificate in Cyber Security | Tertiary Infotech Academy",
    description:
      "WSQ-funded cyber security certification — 4 stackable CompTIA modules with up to 70% subsidy.",
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
