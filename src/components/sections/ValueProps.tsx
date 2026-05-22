import { Container } from "@/components/layout/Container";
import { HiRocketLaunch, HiWrenchScrewdriver, HiCalendarDays } from "react-icons/hi2";

const PROPS = [
  {
    icon: HiRocketLaunch,
    title: "Career Advancement",
    description:
      "Earn in-demand cybersecurity skills that demonstrate your expertise. Our CompTIA-aligned certification prepares you for 20+ career roles in one of the fastest-growing industries.",
    color: "var(--color-cyan)",
  },
  {
    icon: HiWrenchScrewdriver,
    title: "Practical Knowledge",
    description:
      "Get hands-on training from industry veterans. Our modules cover real-world scenarios — from IT support and Linux administration to penetration testing and SOC operations.",
    color: "var(--color-purple-light)",
  },
  {
    icon: HiCalendarDays,
    title: "Flexible & Funded",
    description:
      "Complete your certification in just 2 months via online classes. Up to 70% WSQ funding for eligible learners, with remaining fees claimable via SkillsFuture Credit.",
    color: "var(--color-amber)",
  },
];

export function ValueProps() {
  return (
    <section className="relative py-20 overflow-hidden">
      <Container>
        <div className="grid md:grid-cols-3 gap-6">
          {PROPS.map((prop) => {
            const Icon = prop.icon;
            return (
              <div
                key={prop.title}
                className="glass p-8 group hover:border-white/15 transition-all duration-300"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{ background: `color-mix(in srgb, ${prop.color} 12%, transparent)` }}
                >
                  <Icon className="w-7 h-7" style={{ color: prop.color }} />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-3">{prop.title}</h3>
                <p className="text-sm text-(--color-muted) leading-relaxed">{prop.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
