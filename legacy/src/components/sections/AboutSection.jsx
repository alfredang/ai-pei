import Container from '../layout/Container'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'
import GlassCard from '../ui/GlassCard'

const stats = [
  { value: '20+', label: 'Years Experience' },
  { value: '100+', label: 'Clients Served' },
  { value: 'AI-First', label: 'Approach' },
]

const AboutSection = () => (
  <section id="about" className="py-6 relative">
    <Container>
      <SectionHeading
        label="About Us"
        title="Decades of Innovation in"
        titleHighlight="Enterprise Technology"
        description="We bridge the gap between education, enterprise training, and cutting-edge AI to deliver transformative digital solutions."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text content */}
        <ScrollReveal direction="left">
          <div className="space-y-6">
            <p className="text-gray-400 leading-relaxed">
              Tertiary Infotech is a trusted technology partner specializing in
              Training Management Systems, Learning Management Systems, and
              AI-powered digital solutions. With over two decades of experience, we
              help organizations modernize their training operations and embrace
              intelligent automation.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Our mission is to empower businesses through technology — from
              streamlining complex training workflows to deploying AI-driven
              platforms that deliver measurable results. We combine deep domain
              expertise with modern engineering to build solutions that scale.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal direction="right">
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <GlassCard key={stat.label} className="p-6 text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </Container>
  </section>
)

export default AboutSection
