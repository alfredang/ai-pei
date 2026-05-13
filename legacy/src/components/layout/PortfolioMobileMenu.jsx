import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronDown, HiStar } from 'react-icons/hi2'
import { PORTFOLIO_CATEGORIES } from '../../utils/portfolio'

const PortfolioMobileMenu = ({ onClose }) => {
  const [expandedCat, setExpandedCat] = useState(null)

  return (
    <div className="w-full max-w-sm">
      <p className="text-xs font-medium uppercase tracking-wider text-gray-500 text-center mb-3">
        Portfolio
      </p>
      <div className="space-y-1">
        {PORTFOLIO_CATEGORIES.map((category) => (
          <div key={category.title}>
            <button
              onClick={() =>
                setExpandedCat(expandedCat === category.title ? null : category.title)
              }
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm font-medium text-white hover:bg-white/[0.06] transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <category.icon className="w-4 h-4 text-neon-cyan" />
                {category.title}
              </span>
              <HiChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  expandedCat === category.title ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {expandedCat === category.title && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="py-2 px-3 space-y-3">
                    {category.subcategories.map((sub) => (
                      <div key={sub.label}>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-neon-blue/70 mb-1 px-1">
                          {sub.label}
                        </p>
                        {sub.items.map((item) => (
                          <Link
                            key={item.slug}
                            to={`/portfolio/${item.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-1.5 py-1.5 px-2 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all cursor-pointer"
                          >
                            <span>{item.name}</span>
                            {item.featured && (
                              <HiStar className="w-3 h-3 text-amber-400 flex-shrink-0" />
                            )}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <Link
        to="/portfolio"
        onClick={onClose}
        className="block text-center text-xs font-medium text-neon-blue hover:text-neon-cyan transition-colors mt-3 cursor-pointer"
      >
        View all projects &rarr;
      </Link>
    </div>
  )
}

export default PortfolioMobileMenu
