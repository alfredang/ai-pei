import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiArrowLeft,
  HiStar,
  HiTag,
  HiFolder,
  HiGlobeAlt,
  HiCodeBracket,
  HiCpuChip,
} from 'react-icons/hi2'
import { FaGithub } from 'react-icons/fa6'
import Container from '../components/layout/Container'
import GlowButton from '../components/ui/GlowButton'
import SEO from '../components/seo/SEO'
import { ALL_PROJECTS } from '../utils/portfolio'
import { fadeUp, staggerContainer } from '../utils/animations'
import { useFormValidation } from '../hooks/useFormValidation'

const inputClasses =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/25 focus:outline-none transition-all duration-300'

const ProjectPage = () => {
  const { slug } = useParams()
  const project = ALL_PROJECTS.find((p) => p.slug === slug)

  const { values, errors, touched, handleChange, handleBlur, validateAll, reset } =
    useFormValidation()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateAll()) return

    setSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSubmitting(false)
    setSubmitted(true)
    reset()

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000)
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Container className="text-center py-32">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-8">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link to="/">
            <GlowButton>Back to Home</GlowButton>
          </Link>
        </Container>
      </div>
    )
  }

  const CategoryIcon = project.categoryIcon

  // Find related projects (same subcategory, excluding current)
  const related = ALL_PROJECTS.filter(
    (p) =>
      p.subcategory === project.subcategory &&
      p.slug !== project.slug
  ).slice(0, 3)

  return (
    <div className="min-h-screen pt-24 pb-16">
      <SEO
        title={`${project.name} - ${project.subcategory}`}
        description={`${project.description} ${
          project.features && project.features.length > 0
            ? 'Key features: ' + project.features.slice(0, 3).join(', ') + '.'
            : ''
        }`}
        keywords={`${project.name.toLowerCase()}, ${project.category.toLowerCase()}, ${project.subcategory.toLowerCase()}, ${
          project.techStack.join(', ')
        }, tertiary infotech, singapore software development`}
        url={`https://www.tertiaryinfotech.com/portfolio/${project.slug}`}
        type="article"
      />
      <Container>
        <motion.div
          variants={staggerContainer(0.12, 0.05)}
          initial="hidden"
          animate="visible"
        >
          {/* Back link */}
          <motion.div variants={fadeUp()}>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-neon-cyan transition-colors mb-8 cursor-pointer"
            >
              <HiArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div variants={fadeUp()} className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {project.featured && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  <HiStar className="w-3 h-3" />
                  Featured
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neon-blue/10 text-neon-blue border border-neon-blue/20">
                <HiFolder className="w-3 h-3" />
                {project.category}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">
                <HiTag className="w-3 h-3" />
                {project.subcategory}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {project.name}
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
              {project.description}
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div variants={fadeUp()} className="flex flex-wrap gap-3 mb-10">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <GlowButton className="inline-flex items-center gap-2 text-sm px-6 py-2.5">
                  <HiGlobeAlt className="w-4 h-4" />
                  Live Demo
                </GlowButton>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <GlowButton variant="outline" className="inline-flex items-center gap-2 text-sm px-6 py-2.5">
                  <FaGithub className="w-4 h-4" />
                  Source Code
                </GlowButton>
              </a>
            )}
          </motion.div>

          {/* Tech Stack */}
          {project.techStack.length > 0 && (
            <motion.div variants={fadeUp()} className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <HiCpuChip className="w-5 h-5 text-neon-purple" />
                <h2 className="text-lg font-semibold text-white">Tech Stack</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-neon-purple/10 text-neon-purple border border-neon-purple/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Project details card */}
          <motion.div variants={fadeUp()} className="glass-card p-6 sm:p-8 md:p-12 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left: Overview */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-white mb-4">Overview</h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {project.description} This project was developed by Tertiary Infotech Academy Pte. Ltd.
                  as part of our {project.category.toLowerCase()} solutions portfolio,
                  showcasing our expertise in building modern, scalable applications.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="#get-started">
                    <GlowButton className="text-sm px-6 py-2.5">Request Demo</GlowButton>
                  </a>
                </div>
              </div>

              {/* Right: Details */}
              <div className="space-y-4">
                <div className="glass-card p-4">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Category</h3>
                  <div className="flex items-center gap-2">
                    <CategoryIcon className="w-5 h-5 text-neon-cyan" />
                    <span className="text-white font-medium text-sm">{project.category}</span>
                  </div>
                </div>
                <div className="glass-card p-4">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Type</h3>
                  <span className="text-white font-medium text-sm">{project.subcategory}</span>
                </div>
                <div className="glass-card p-4">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Built By</h3>
                  <span className="text-white font-medium text-sm">Tertiary Infotech Academy Pte. Ltd.</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features section */}
          {project.features && project.features.length > 0 && (
            <motion.div variants={fadeUp()} className="glass-card p-6 sm:p-8 md:p-12 mb-12">
              <h2 className="text-xl font-semibold text-white mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-200"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-300 leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Let's Get Started - Contact Form */}
          <motion.div variants={fadeUp()} className="mb-12" id="get-started">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">Let's Get Started</h2>
            <p className="text-gray-400 mb-8 text-center max-w-2xl mx-auto">
              Interested in {project.name}? Get in touch and let's discuss how we can help transform your organization.
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="glass-card p-8 md:p-10">

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-neon-cyan/10 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-neon-cyan"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-400">
                    Thank you for reaching out. We'll get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* Name & Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Name <span className="text-neon-pink">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Your name"
                        className={inputClasses}
                      />
                      {touched.name && errors.name && (
                        <p className="mt-1.5 text-sm text-neon-pink">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email <span className="text-neon-pink">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="you@company.com"
                        className={inputClasses}
                      />
                      {touched.email && errors.email && (
                        <p className="mt-1.5 text-sm text-neon-pink">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={values.company}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Your company name"
                      className={inputClasses}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message <span className="text-neon-pink">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tell us about your project..."
                      rows={4}
                      className={`${inputClasses} resize-none`}
                    />
                    {touched.message && errors.message && (
                      <p className="mt-1.5 text-sm text-neon-pink">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <GlowButton
                    type="submit"
                    disabled={submitting}
                    className="w-full"
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </GlowButton>
                </motion.form>
              )}
            </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Related Projects */}
          {related.length > 0 && (
            <motion.div variants={fadeUp()}>
              <h2 className="text-2xl font-bold text-white mb-6">Related Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    to={`/portfolio/${rel.slug}`}
                    className="glass-card p-6 group hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {rel.featured && (
                        <HiStar className="w-4 h-4 text-amber-400" />
                      )}
                      <span className="text-xs text-neon-blue/70 font-medium uppercase tracking-wider">
                        {rel.subcategory}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-neon-cyan transition-colors mb-2">
                      {rel.name}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {rel.description}
                    </p>
                    {rel.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {rel.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/[0.05] text-gray-500"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </div>
  )
}

export default ProjectPage
