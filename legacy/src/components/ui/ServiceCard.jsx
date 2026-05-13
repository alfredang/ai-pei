import { motion } from 'framer-motion'
import { HiCheck } from 'react-icons/hi2'

const accentStyles = {
  blue: {
    iconBg: 'bg-neon-blue/10',
    iconText: 'text-neon-blue',
    glowHover: 'group-hover:shadow-glow-blue',
    gradientOverlay: 'from-neon-blue/5',
    ring: 'ring-neon-blue/30',
  },
  cyan: {
    iconBg: 'bg-neon-cyan/10',
    iconText: 'text-neon-cyan',
    glowHover: 'group-hover:shadow-glow-cyan',
    gradientOverlay: 'from-neon-cyan/5',
    ring: 'ring-neon-cyan/30',
  },
  purple: {
    iconBg: 'bg-neon-purple/10',
    iconText: 'text-neon-purple',
    glowHover: 'group-hover:shadow-glow-purple',
    gradientOverlay: 'from-neon-purple/5',
    ring: 'ring-neon-purple/30',
  },
}

const ServiceCard = ({ icon: Icon, title, description, features, accent = 'blue' }) => {
  const styles = accentStyles[accent]

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="glass-card p-8 group relative overflow-hidden"
    >
      {/* Hover gradient overlay */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b ${styles.gradientOverlay} to-transparent`}
      />

      {/* Hover glow ring */}
      <div
        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ring-1 ${styles.ring}`}
      />

      {/* Content */}
      <div className="relative z-10">
        <div
          className={`w-14 h-14 rounded-xl ${styles.iconBg} flex items-center justify-center ${styles.iconText} mb-6 transition-shadow duration-300 ${styles.glowHover}`}
        >
          <Icon className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>

        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-sm text-gray-400">
              <HiCheck className="text-neon-cyan w-4 h-4 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default ServiceCard
