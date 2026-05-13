import SEO from '../components/seo/SEO'
import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import ServicesSection from '../components/sections/ServicesSection'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import ContactSection from '../components/sections/ContactSection'

const HomePage = () => (
  <>
    <SEO
      title="Tertiary Infotech Academy - AI-Powered Solutions for Education, HR & Enterprise"
      description="Professional software development and AI consulting services in Singapore. Specializing in Learning Management Systems, HR platforms, enterprise applications, and custom AI solutions. Expert team delivering modern web technologies including Next.js, React, and TypeScript."
      keywords="software development singapore, AI solutions, learning management system, HR management, enterprise software, web development, react development, next.js, AI chatbot, machine learning, singapore tech company, LMS platform, training management, property management software"
      url="https://www.tertiaryinfotech.com"
    />
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <WhyChooseUs />
    <ContactSection />
  </>
)

export default HomePage
