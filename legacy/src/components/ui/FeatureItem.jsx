import ScrollReveal from './ScrollReveal'

const accentStyles = {
  blue: {
    iconBg: 'bg-neon-blue/10',
    iconText: 'text-neon-blue',
    hoverBorder: 'hover:border-neon-blue/30',
    glowHover: 'group-hover:shadow-glow-blue',
  },
  cyan: {
    iconBg: 'bg-neon-cyan/10',
    iconText: 'text-neon-cyan',
    hoverBorder: 'hover:border-neon-cyan/30',
    glowHover: 'group-hover:shadow-glow-cyan',
  },
  purple: {
    iconBg: 'bg-neon-purple/10',
    iconText: 'text-neon-purple',
    hoverBorder: 'hover:border-neon-purple/30',
    glowHover: 'group-hover:shadow-glow-purple',
  },
}

const FeatureItem = ({ icon: Icon, title, description, accent = 'blue', delay = 0 }) => {
  const styles = accentStyles[accent]

  return (
    <ScrollReveal delay={delay}>
      <div
        className={`glass-card p-6 text-center group transition-all duration-300 ${styles.hoverBorder}`}
      >
        <div
          className={`w-12 h-12 rounded-lg ${styles.iconBg} flex items-center justify-center ${styles.iconText} mx-auto mb-4 transition-shadow duration-300 ${styles.glowHover}`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      </div>
    </ScrollReveal>
  )
}

export default FeatureItem
