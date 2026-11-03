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
import { HomeUrlCleanup } from "@/components/HomeUrlCleanup";

const SITE_URL = "https://www.tertiaryinfotech.edu.sg";

export const metadata: Metadata = {
  title: { absolute: "Study Tech in Singapore — Cyber, AI, Blockchain, Quantum" },
  description:
    "Earn a Singapore Advanced Certificate in Cyber Security, AI, Blockchain or Quantum Computing — live online, English-taught, for international learners.",
  keywords:
    "study tech in Singapore, cybersecurity courses Singapore, study cybersecurity in Singapore, AI training for foreigners, AI courses Singapore for foreigners, blockchain academy Singapore, quantum computing courses Asia, tech courses Singapore for international students",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Study Tech in Singapore — Cyber, AI, Blockchain & Quantum",
    description:
      "Live online, English-taught Cyber Security, AI, Blockchain & Quantum Computing Advanced Certificates from a Singapore PEI.",
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
      "Live online future-tech Advanced Certificates from a Singapore PEI — study from anywhere. Career-ready.",
    images: ["/images/hero-classroom.png"],
  },
};

// Each discipline points at its keyword landing page.
const DISCIPLINES = [
  { name: "Advanced Certificate in Cyber Security in Singapore", path: "/courses/advanced-certificate-in-cyber-security.html", desc: "CompTIA-aligned cyber security training — A+, Security+, Linux+, then CySA+ or PenTest+. Live online." },
  { name: "Advanced Certificate in Artificial Intelligence in Singapore", path: "/advanced-certificate-in-artificial-intelligence.html", desc: "Five AI programmes — AI security, agentic AI, audit, risk and governance. Live online." },
  { name: "Advanced Certificate in Blockchain in Singapore", path: "/advanced-certificate-in-blockchain.html", desc: "Enterprise blockchain architecture and digital asset compliance. Live online." },
  { name: "Advanced Certificate in Quantum Computing in Singapore", path: "/courses/advanced-certificate-in-applied-quantum-computing-and-qiskit-programming.html", desc: "Qiskit programming on IBM Quantum systems. Live online." },
];

const educationalOrgLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Tertiary Infotech Academy",
  alternateName: "Tertiary Infotech Academy Pte Ltd",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description:
    "A Singapore Private Education Institution offering live online, English-taught Cyber Security, Artificial Intelligence, Blockchain and Quantum Computing programmes for international learners.",
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
      url: `${SITE_URL}${d.path}`,
      description: d.desc,
      provider: { "@type": "Organization", name: "Tertiary Infotech Academy", sameAs: SITE_URL },
    })),
  },
};

export default function HomePage() {
  return (
    <>
      <HomeUrlCleanup />
      <Navbar />
      <main className="home-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgLd) }}
        />
        <HomeHero />
        <ValueProps />
        <Programs />
        <WhyChooseInstitute />
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
