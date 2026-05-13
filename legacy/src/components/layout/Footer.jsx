import { Link as RouterLink } from 'react-router-dom'
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa6'
import {
  HiEnvelope,
  HiPhone,
  HiChatBubbleLeftRight,
  HiMapPin,
} from 'react-icons/hi2'
import Container from './Container'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#about' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Services', to: '/#services' },
  { label: 'Contact', to: '/#contact' },
]

const services = [
  { label: 'Training Management System', to: '/#services' },
  { label: 'Learning Management System', to: '/#services' },
  { label: 'AI-Powered Solutions', to: '/#services' },
]

const affiliatedWebsites = [
  { label: 'Tertiary Infotech', url: 'https://www.tertiaryinfotech.com' },
  { label: 'Tertiary Courses', url: 'https://www.tertiarycourses.com.sg' },
  { label: 'Tertiary Robotics', url: 'https://www.tertiaryrobotics.com' },
]

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5">
      <div className="h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent" />

      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-1">
          {/* Column 1: Brand */}
          <div className="lg:col-span-3">
            <RouterLink to="/">
              <span className="text-xl font-bold text-white">
                Tertiary<span className="gradient-text">Infotech</span>
              </span>
            </RouterLink>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              A leading provider of professional IT training and custom software development in Singapore. We specialize in Training Management Systems (TMS), Learning Management Systems (LMS), AI-powered solutions, and enterprise applications. With over two decades of experience, we empower organizations to transform their operations through cutting-edge technology and innovation.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <RouterLink
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </RouterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Affiliated Websites */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Affiliated Websites
            </h4>
            <ul className="space-y-3">
              {affiliatedWebsites.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Services */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.label}>
                  <RouterLink
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </RouterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Connect */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Connect With Us
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.linkedin.com/in/angchewhoe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-200"
                >
                  <FaLinkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/alfredang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-200"
                >
                  <FaGithub className="w-4 h-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6586688544"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-200"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  +65 8668 8544
                </a>
              </li>
              <li>
                <a
                  href="mailto:enquiry@tertiaryinfotech.com"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-200"
                >
                  <HiEnvelope className="w-4 h-4" />
                  enquiry@tertiaryinfotech.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+6561000613"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-200"
                >
                  <HiPhone className="w-4 h-4" />
                  +65 6100 0613
                </a>
              </li>
              <li>
                <RouterLink
                  to="/#contact"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-200"
                >
                  <HiChatBubbleLeftRight className="w-4 h-4" />
                  Contact Form
                </RouterLink>
              </li>
              <li>
                <div className="flex items-start gap-2 text-sm text-gray-400">
                  <HiMapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    12 Woodlands Square, #07-85/86/87, Woods Square Tower 1,
                    Singapore 737715
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-sm text-gray-500">
            &copy; 2026 Tertiary Infotech Academy Pte Ltd. UEN: 201200606W. All
            rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
