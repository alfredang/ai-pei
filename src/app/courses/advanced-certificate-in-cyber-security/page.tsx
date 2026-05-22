export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { CoursesCarousel } from "@/components/sections/CoursesCarousel";
import { CourseDetails } from "@/components/sections/CourseDetails";
import { FundingCalculator } from "@/components/sections/FundingCalculator";
import { JobRoles } from "@/components/sections/JobRoles";
import { ContactForm } from "@/components/sections/ContactForm";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Advanced Certificate in Cyber Security | WSQ Funded",
  description:
    "Earn the WSQ Advanced Certificate in Cyber Security with 4 stackable CompTIA modules — A+, Security+, Linux+, CySA+/PenTest+. Up to 70% WSQ funding. SkillsFuture Credit claimable.",
  keywords:
    "Advanced Certificate in Cyber Security, WSQ Cyber Security Course Singapore, CompTIA A+, Security+, Linux+, CySA+, PenTest+, SkillsFuture Credit Cyber Security, Cybersecurity Training Singapore",
  alternates: { canonical: "/courses/advanced-certificate-in-cyber-security" },
  openGraph: {
    type: "website",
    url: "/courses/advanced-certificate-in-cyber-security",
    title: "Advanced Certificate in Cyber Security | WSQ Funded | Tertiary Infotech Academy",
    description:
      "Comprehensive WSQ-funded cyber security training pathway — 4 stackable CompTIA modules with up to 70% subsidy.",
    locale: "en_SG",
    siteName: "Tertiary Infotech Academy",
    images: [{ url: "/images/hero-classroom.png", width: 1200, height: 630, alt: "Cyber Security Training Classroom" }],
  },
};

export default function CyberSecurityCoursePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroBanner />
        <StatsStrip />
        <CoursesCarousel />
        <CourseDetails />
        <FundingCalculator />
        <JobRoles />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
