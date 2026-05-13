import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiStar, HiMagnifyingGlass } from 'react-icons/hi2'
import Container from '../components/layout/Container'
import ScrollReveal from '../components/ui/ScrollReveal'
import SEO from '../components/seo/SEO'
import { PORTFOLIO_CATEGORIES } from '../utils/portfolio'
import { staggerContainer, fadeUp } from '../utils/animations'

const PortfolioPage = () => {
  const [filter, setFilter] = useState('All')
  const categories = ['All', ...PORTFOLIO_CATEGORIES.map((c) => c.title)]

  const filtered =
    filter === 'All'
      ? PORTFOLIO_CATEGORIES
      : PORTFOLIO_CATEGORIES.filter((c) => c.title === filter)

  return (
    <div className="min-h-screen pt-24 pb-16">
      <SEO
        title="Portfolio - AI Solutions & Software Projects"
        description="Explore our complete portfolio of AI-powered solutions, learning management systems, HR platforms, enterprise tools, property management, and innovative web applications. Over 50+ projects showcasing modern technology and expert craftsmanship."
        keywords="portfolio, AI solutions, learning management system, HR management software, property management, enterprise applications, web development projects, react projects, next.js applications, AI chatbot, singapore software portfolio"
        url="https://www.tertiaryinfotech.com/portfolio"
      />
      <Container>
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-neon-blue/10 text-neon-blue border border-neon-blue/20 mb-6">
              Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Our <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-lg text-gray-400">
              Explore our complete portfolio of AI-powered solutions, learning platforms,
              enterprise tools, and more.
            </p>
          </div>
        </ScrollReveal>

        {/* Category filter */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  filter === cat
                    ? 'bg-neon-blue text-white shadow-glow-blue'
                    : 'bg-white/[0.05] text-gray-400 border border-white/[0.08] hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Categories */}
        <div className="space-y-16">
          {filtered.map((category) => (
            <div key={category.title}>
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-neon-cyan" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                </div>
              </ScrollReveal>

              {category.subcategories.map((sub) => (
                <div key={sub.label} className="mb-8">
                  <ScrollReveal>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neon-blue/70 mb-4 ml-1">
                      {sub.label}
                    </h3>
                  </ScrollReveal>

                  <motion.div
                    variants={staggerContainer(0.05)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  >
                    {sub.items.map((item) => (
                      <motion.div key={item.slug} variants={fadeUp()}>
                        <Link
                          to={`/portfolio/${item.slug}`}
                          className="glass-card p-5 block group hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300 cursor-pointer h-full"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-sm font-semibold text-white group-hover:text-neon-cyan transition-colors leading-tight">
                              {item.name}
                            </h4>
                            {item.featured && (
                              <HiStar className="w-4 h-4 text-amber-400 flex-shrink-0 ml-2" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal>
          <div className="text-center mt-20">
            <p className="text-gray-400 mb-4">
              Interested in any of our solutions?
            </p>
            <Link to="/#contact">
              <button className="px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-cyan text-white font-semibold rounded-xl hover:shadow-glow-blue hover:scale-105 transition-all duration-300 cursor-pointer">
                Get in Touch
              </button>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </div>
  )
}

export default PortfolioPage
