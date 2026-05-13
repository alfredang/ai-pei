const GlassCard = ({ children, className = '', hover = true }) => (
  <div
    className={`
      glass-card
      ${hover ? 'hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300' : ''}
      ${className}
    `}
  >
    {children}
  </div>
)

export default GlassCard
