import { motion, AnimatePresence } from 'framer-motion'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { HiXMark } from 'react-icons/hi2'
import PortfolioMobileMenu from './PortfolioMobileMenu'

const MOBILE_NAV = [
  { label: 'Home', to: 'home' },
  { label: 'About', to: 'about' },
]

const MOBILE_NAV_AFTER = [
  { label: 'Services', to: 'services' },
  { label: 'Why Us', to: 'why-us' },
]

const MobileNavLink = ({ to, label, onClose }) => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  if (isHome) {
    return (
      <ScrollLink
        to={to}
        smooth
        offset={-80}
        duration={600}
        onClick={onClose}
        className="text-2xl font-semibold text-gray-200 active:text-neon-cyan transition-colors duration-150 cursor-pointer"
      >
        {label}
      </ScrollLink>
    )
  }

  return (
    <RouterLink
      to={`/#${to}`}
      onClick={onClose}
      className="text-2xl font-semibold text-gray-200 active:text-neon-cyan transition-colors duration-150 cursor-pointer"
    >
      {label}
    </RouterLink>
  )
}

const MobileMenu = ({ open, onClose }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-50 bg-dark-deeper flex flex-col overflow-y-auto"
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-white p-3 -m-1 active:scale-90 transition-transform cursor-pointer"
            aria-label="Close menu"
          >
            <HiXMark className="w-7 h-7" />
          </button>
        </div>

        {/* Nav links */}
        <div className="flex flex-col items-center justify-center flex-1 gap-6 py-8">
          {MOBILE_NAV.map((link) => (
            <MobileNavLink key={link.to} to={link.to} label={link.label} onClose={onClose} />
          ))}

          {/* Portfolio accordion */}
          <PortfolioMobileMenu onClose={onClose} />

          {MOBILE_NAV_AFTER.map((link) => (
            <MobileNavLink key={link.to} to={link.to} label={link.label} onClose={onClose} />
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
)

export default MobileMenu
