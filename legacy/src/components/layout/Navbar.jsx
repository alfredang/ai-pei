import { useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { motion } from 'framer-motion'
import { HiBars3 } from 'react-icons/hi2'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import Container from './Container'
import MobileMenu from './MobileMenu'
import PortfolioMegaMenu from './PortfolioMegaMenu'
import GlowButton from '../ui/GlowButton'

const NAV_SCROLL_LINKS = [
  { label: 'Home', to: 'home' },
  { label: 'About', to: 'about' },
  { label: 'Services', to: 'services' },
  { label: 'Why Us', to: 'why-us' },
]

const NavScrollLink = ({ to, label }) => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  if (isHome) {
    return (
      <ScrollLink
        to={to}
        smooth
        offset={-80}
        duration={600}
        spy
        activeClass="text-neon-cyan"
        className="text-sm text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
      >
        {label}
      </ScrollLink>
    )
  }

  return (
    <RouterLink
      to={`/#${to}`}
      className="text-sm text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
    >
      {label}
    </RouterLink>
  )
}

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolled = useScrollPosition(50)
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-dark-deeper/80 backdrop-blur-lg border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <Container className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <RouterLink to="/" className="cursor-pointer">
            <span className="text-xl font-bold text-white">
              Tertiary<span className="gradient-text">Infotech</span>
            </span>
          </RouterLink>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            <NavScrollLink to="home" label="Home" />
            <NavScrollLink to="about" label="About" />
            <NavScrollLink to="services" label="Services" />
            <PortfolioMegaMenu />
            <NavScrollLink to="why-us" label="Why Us" />
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            {isHome ? (
              <ScrollLink to="contact" smooth offset={-80} duration={600}>
                <GlowButton className="text-sm px-6 py-2.5">Get Started</GlowButton>
              </ScrollLink>
            ) : (
              <RouterLink to="/#contact">
                <GlowButton className="text-sm px-6 py-2.5">Get Started</GlowButton>
              </RouterLink>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-3 -mr-2 active:scale-90 transition-transform cursor-pointer"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <HiBars3 className="w-7 h-7" />
          </button>
        </Container>
      </motion.nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}

export default Navbar
