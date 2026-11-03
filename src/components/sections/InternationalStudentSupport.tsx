import { Container } from "@/components/layout/Container";
import {
  HiBolt,
  HiComputerDesktop,
  HiHomeModern,
  HiAcademicCap,
  HiGlobeAsiaAustralia,
  HiUserGroup,
} from "react-icons/hi2";

const BENEFITS = [
  {
    icon: HiBolt,
    title: "Short 3–6 month certification",
    body: "Earn an industry-recognised Advanced Certificate in just 3 to 6 months — start your tech career fast, without committing years to a degree.",
  },
  {
    icon: HiComputerDesktop,
    title: "Live online — study from anywhere",
    body: "Classes run live online in English, in Singapore-time evening sessions, so you can earn a Singapore Advanced Certificate from your home country. No relocation and no Student's Pass needed.",
  },
  {
    icon: HiHomeModern,
    title: "Visiting Singapore? Practical tips",
    body: "Planning a trip for a networking event or to meet your trainers? We share tips on accommodation and getting around — check ICA's entry and visa requirements before you travel.",
  },
  {
    icon: HiAcademicCap,
    title: "Higher education consultancy",
    body: "Free consultancy on studying in Singapore — choosing the right course, your learning pathway, and where an Advanced Certificate can take you next.",
  },
  {
    icon: HiGlobeAsiaAustralia,
    title: "One-day Singapore tour",
    body: "If you visit Singapore, join a complimentary one-day tour of the city and our campus area to meet the team and fellow learners.",
  },
  {
    icon: HiUserGroup,
    title: "Social & networking activities",
    body: "Join a community of international students and tech professionals through regular online and in-person networking activities.",
  },
];

/**
 * Reusable "why study with us as an international student" section.
 * Drop into course landers / the homepage to surface the foreign-student support offer.
 */
export function InternationalStudentSupport({
  heading,
}: {
  heading?: React.ReactNode;
} = {}) {
  return (
    <section className="relative py-12 overflow-hidden">
      <div
        className="glow-blob"
        style={{
          top: "10%",
          right: "-8%",
          width: 460,
          height: 460,
          background: "radial-gradient(circle, rgba(60,224,124,0.4) 0%, transparent 70%)",
        }}
      />
      <Container className="relative">
        <div className="max-w-3xl mb-10">
          <div className="kicker mb-3">[ INTERNATIONAL STUDENT SUPPORT ]</div>
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
            {heading ?? (
              <>
                Everything you need to{" "}
                <span className="gradient-text">study in Singapore</span>.
              </>
            )}
          </h2>
          <p className="text-(--color-muted) mt-4">
            Study live online from your home country — we support you from enquiry to graduation,
            and help you build a network in Singapore&apos;s tech scene.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BENEFITS.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="glass card-hover p-6 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-(--color-cyan) to-transparent" />
                <Icon className="w-8 h-8 text-(--color-cyan) mb-3" />
                <h3 className="font-display font-bold text-lg mb-2">{b.title}</h3>
                <p className="text-sm text-(--color-muted) leading-relaxed">{b.body}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
