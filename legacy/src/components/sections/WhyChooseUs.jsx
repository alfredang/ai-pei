import Container from '../layout/Container'
import SectionHeading from '../ui/SectionHeading'
import FeatureItem from '../ui/FeatureItem'
import { WHY_CHOOSE_US } from '../../utils/constants'

const WhyChooseUs = () => (
  <section id="why-us" className="py-6 relative">
    <Container>
      <SectionHeading
        label="Why Choose Us"
        title="Built Different."
        titleHighlight="Built Better."
        description="We combine deep industry expertise with cutting-edge technology to deliver solutions that truly matter."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WHY_CHOOSE_US.map((feature, index) => (
          <FeatureItem
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            accent={feature.accent}
            delay={index * 0.1}
          />
        ))}
      </div>
    </Container>
  </section>
)

export default WhyChooseUs
