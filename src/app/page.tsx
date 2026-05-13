export const dynamic = "force-dynamic";

import { Hero } from "@/components/sections/Hero";
import { AILmsTmsShowcase } from "@/components/sections/AILmsTmsShowcase";
import { ELearningShowcase } from "@/components/sections/ELearningShowcase";
import { EdToolsShowcase } from "@/components/sections/EdToolsShowcase";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { FeaturedPosts } from "@/components/sections/FeaturedPosts";
import { ContactForm } from "@/components/sections/ContactForm";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AILmsTmsShowcase />
        <ELearningShowcase />
        <EdToolsShowcase />
        <Services />
        <WhyChooseUs />
        <FeaturedPosts />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
