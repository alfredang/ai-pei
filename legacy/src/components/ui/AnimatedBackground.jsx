const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Gradient orbs */}
    <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-neon-blue/20 blur-[120px] animate-float" />
    <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full bg-neon-purple/20 blur-[120px] animate-float-delayed" />
    <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] rounded-full bg-neon-cyan/15 blur-[120px] animate-float-slow" />

    {/* Dot grid overlay */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }}
    />
  </div>
)

export default AnimatedBackground
