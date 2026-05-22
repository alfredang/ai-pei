import { Container } from "@/components/layout/Container";
import {
  HiShieldCheck,
  HiWrenchScrewdriver,
  HiServerStack,
  HiFingerPrint,
} from "react-icons/hi2";

const ROLE_CATEGORIES = [
  {
    title: "IT Support & Infrastructure",
    icon: HiWrenchScrewdriver,
    color: "var(--color-cyan)",
    roles: [
      "IT Support Technician",
      "IT Helpdesk Specialist",
      "Desktop Support Engineer",
      "System Support Engineer",
      "Network Support Technician",
    ],
  },
  {
    title: "System Administration",
    icon: HiServerStack,
    color: "var(--color-green)",
    roles: [
      "Junior System Administrator",
      "Linux System Administrator (Junior)",
      "Information Security Administrator",
    ],
  },
  {
    title: "Security Operations",
    icon: HiShieldCheck,
    color: "var(--color-purple-light)",
    roles: [
      "SOC Analyst – Level 1",
      "Cybersecurity Analyst (Junior)",
      "Cybersecurity Technician",
      "Cybersecurity Executive",
      "Incident Response Technician",
      "Threat Intelligence Assistant",
      "IT Security Compliance Assistant",
    ],
  },
  {
    title: "Offensive Security & Cloud",
    icon: HiFingerPrint,
    color: "var(--color-amber)",
    roles: [
      "Penetration Testing Assistant",
      "Vulnerability Assessment Assistant",
      "Network Security Technician",
      "Junior DevSecOps Support Engineer",
      "Cloud Security Support Technician",
    ],
  },
];


export function JobRoles() {
  return (
    <section id="career-roles" className="relative py-20 overflow-hidden">
      <div className="grid-bg opacity-30" />
      <div
        className="glow-blob"
        style={{
          bottom: "0%",
          left: "20%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, #5C00E5 0%, transparent 60%)",
          opacity: 0.1,
        }}
      />

      <Container className="relative">
        <div className="text-center mb-12">
          <div className="kicker mb-4">[ CAREER OUTCOMES ]</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05]">
            <span className="gradient-text">20+ Career Roles</span> Await You
          </h2>
          <p className="mt-4 text-(--color-muted) text-lg max-w-2xl mx-auto">
            Graduates are prepared for a wide range of cybersecurity and IT roles across industries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {ROLE_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.title} className="glass p-6 md:p-8">
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `color-mix(in srgb, ${cat.color} 15%, transparent)` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: cat.color }} />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">{cat.title}</h3>
                </div>

                {/* Roles grid */}
                <div className="space-y-2">
                  {cat.roles.map((role) => (
                    <div key={role} className="role-card flex items-center gap-3">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: cat.color }}
                      />
                      <span className="text-sm text-white/80">{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
