export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/HomeHero";
import { ValueProps } from "@/components/sections/ValueProps";
import { WhyChooseInstitute } from "@/components/sections/WhyChooseInstitute";
import { Programs } from "@/components/sections/Programs";
import { CareersOutcomes } from "@/components/sections/CareersOutcomes";
import { AdmissionsSection } from "@/components/sections/AdmissionsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { ContactForm } from "@/components/sections/ContactForm";
import { FeaturedPosts } from "@/components/sections/FeaturedPosts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const SITE_URL = "https://www.tertiaryinfotech.com";

export const metadata: Metadata = {
  title: { absolute: "Study Tech in Singapore — Cyber, AI, Blockchain, Quantum" },
  description:
    "Study Cybersecurity, AI, Blockchain & Quantum in Singapore — Asia's top tech hub. English-taught, globally recognised courses for foreign learners.",
  keywords:
    "study tech in Singapore, cybersecurity courses Singapore, study cybersecurity in Singapore, AI training for foreigners, AI courses Singapore for foreigners, blockchain academy Singapore, quantum computing courses Asia, tech courses Singapore for international students",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Study Tech in Singapore — Cyber, AI, Blockchain & Quantum",
    description:
      "English-taught Cybersecurity, AI, Blockchain & Quantum Computing courses for international learners in Asia's leading tech hub.",
    locale: "en_SG",
    siteName: "Tertiary Infotech Academy",
    images: [
      {
        url: "/images/hero-classroom.png",
        width: 1200,
        height: 630,
        alt: "International students studying future-tech courses in Singapore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Study Tech in Singapore — Cyber, AI, Blockchain & Quantum",
    description:
      "English-taught future-tech courses for foreigners in Asia's leading tech hub. Globally recognised, career-ready.",
    images: ["/images/hero-classroom.png"],
  },
};

const DISCIPLINES = [
  { name: "Cybersecurity Courses in Singapore", desc: "Hands-on cybersecurity training for international learners — SOC operations, threat hunting and penetration testing." },
  { name: "AI Training for Foreigners in Singapore", desc: "Applied artificial intelligence — machine learning, generative AI and agentic-AI engineering, taught in English." },
  { name: "Blockchain Academy in Singapore", desc: "Smart contracts, Web3 and distributed-ledger development in a leading global fintech hub." },
  { name: "Quantum Computing Courses in Asia", desc: "Foundational quantum algorithms and programming for the next computing era." },
];

const educationalOrgLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Tertiary Infotech Academy",
  alternateName: "Tertiary Infotech Academy Pte Ltd",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description:
    "A Singapore academy offering English-taught Cybersecurity, Artificial Intelligence, Blockchain and Quantum Computing programmes for international learners.",
  knowsLanguage: "en",
  areaServed: [
    { "@type": "Country", name: "Singapore" },
    { "@type": "Place", name: "ASEAN" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Singapore",
    addressCountry: "SG",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Future-Tech Programmes",
    itemListElement: DISCIPLINES.map((d) => ({
      "@type": "Course",
      name: d.name,
      description: d.desc,
      provider: { "@type": "Organization", name: "Tertiary Infotech Academy", sameAs: SITE_URL },
    })),
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgLd) }}
        />
        <HomeHero />
        <ValueProps />
        <WhyChooseInstitute />
        <Programs />
        <CareersOutcomes />
        <AdmissionsSection />
        <FeaturedPosts />
        <FaqSection />
        <CTABanner />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
