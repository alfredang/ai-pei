import { motion } from 'framer-motion'

const variants = {
  primary:
    'bg-gradient-to-r from-neon-blue to-neon-cyan text-white hover:shadow-glow-blue hover:scale-105',
  outline:
    'border border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue hover:shadow-glow-blue',
}

const GlowButton = ({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  type = 'button',
  className = '',
}) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    type={type}
    className={`
      relative px-8 py-3 font-semibold rounded-xl transition-all duration-300 active:scale-95
      ${variants[variant]}
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      ${className}
    `}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </motion.button>
)

export default GlowButton
