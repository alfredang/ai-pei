import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '../layout/Container'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import GlowButton from '../ui/GlowButton'
import ScrollReveal from '../ui/ScrollReveal'
import { useFormValidation } from '../../hooks/useFormValidation'

const inputClasses =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/25 focus:outline-none transition-all duration-300'

const ContactSection = () => {
  const { values, errors, touched, handleChange, handleBlur, validateAll, reset } =
    useFormValidation()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateAll()) return

    setSubmitting(true)
    setError(null)

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          company: values.company,
          message: values.message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setSubmitted(true)
      reset()

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      console.error('Error sending message:', err)
      setError(err.message || 'Failed to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-6 relative">
      <Container>
        <SectionHeading
          label="Contact Us"
          title="Let's Build Something"
          titleHighlight="Extraordinary"
          description="Ready to transform your organization? Get in touch and let's discuss how we can help."
        />

        <ScrollReveal>
          <div className="max-w-2xl mx-auto">
            <GlassCard className="p-8 md:p-10" hover={false}>
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
                    className="space-y-6"
                  >
                    {/* Name & Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                        rows={5}
                        className={`${inputClasses} resize-none`}
                      />
                      {touched.message && errors.message && (
                        <p className="mt-1.5 text-sm text-neon-pink">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                        <p className="text-sm text-red-400">{error}</p>
                      </div>
                    )}

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
            </GlassCard>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}

export default ContactSection
