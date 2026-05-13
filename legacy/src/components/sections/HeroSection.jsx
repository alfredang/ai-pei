import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import Container from '../layout/Container'
import AnimatedBackground from '../ui/AnimatedBackground'
import GlowButton from '../ui/GlowButton'
import { staggerContainer, fadeUp } from '../../utils/animations'

const HeroSection = () => (
  <section
    id="home"
    className="relative min-h-[75vh] flex items-center justify-center overflow-hidden"
  >
    <AnimatedBackground />

    <Container className="relative z-10 text-center py-20">
      <motion.div
        variants={staggerContainer(0.2, 0.3)}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center"
      >
        {/* Headline */}
        <motion.h1
          variants={fadeUp()}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-5xl"
        >
          Powering the Future of{' '}
          <span className="gradient-text">Training & AI Solutions</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp()}
          className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed"
        >
          Enterprise-grade Training Management, Learning Management, and AI-powered
          platforms designed to transform how organizations learn, grow, and innovate.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp()}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Link to="services" smooth offset={-80} duration={600}>
            <GlowButton>Explore Solutions</GlowButton>
          </Link>
          <Link to="contact" smooth offset={-80} duration={600}>
            <GlowButton variant="outline">Contact Us</GlowButton>
          </Link>
        </motion.div>
      </motion.div>
    </Container>

    {/* Bottom gradient fade */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-deeper to-transparent" />
  </section>
)

export default HeroSection
