import ScrollReveal from './ScrollReveal'

const SectionHeading = ({ label, title, titleHighlight, description }) => (
  <ScrollReveal>
    <div className="text-center max-w-3xl mx-auto mb-12">
      {label && (
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-neon-blue/10 text-neon-blue border border-neon-blue/20 mb-6">
          {label}
        </span>
      )}
      <h2 className="section-heading text-white mb-4">
        {title}{' '}
        {titleHighlight && <span className="gradient-text">{titleHighlight}</span>}
      </h2>
      {description && <p className="text-lg text-gray-400">{description}</p>}
    </div>
  </ScrollReveal>
)

export default SectionHeading
