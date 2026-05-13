import { motion } from 'framer-motion'
import Container from '../layout/Container'
import SectionHeading from '../ui/SectionHeading'
import ServiceCard from '../ui/ServiceCard'
import { SERVICES } from '../../utils/constants'
import { staggerContainer, fadeUp } from '../../utils/animations'

const ServicesSection = () => (
  <section id="services" className="py-6 relative">
    <Container>
      <SectionHeading
        label="Our Services"
        title="Enterprise Solutions Built for"
        titleHighlight="the Future"
        description="From training management to AI automation, we deliver comprehensive platforms that drive real results."
      />

      <motion.div
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {SERVICES.map((service) => (
          <motion.div key={service.id} variants={fadeUp()}>
            <ServiceCard
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              accent={service.accent}
            />
          </motion.div>
        ))}
      </motion.div>
    </Container>
  </section>
)

export default ServicesSection
