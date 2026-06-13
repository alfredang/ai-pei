import { Container } from "@/components/layout/Container";
import {
  HiBolt,
  HiIdentification,
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
    icon: HiIdentification,
    title: "Student Pass application assistance",
    body: "We guide you through the ICA Student's Pass application end-to-end — eligibility, documents and submission — so you can study in Singapore with confidence.",
  },
  {
    icon: HiHomeModern,
    title: "Accommodation & logistics support",
    body: "Arriving from overseas? We help you sort accommodation, airport arrival and settling-in logistics so you can focus on your studies.",
  },
  {
    icon: HiAcademicCap,
    title: "Higher education consultancy",
    body: "Free consultancy on studying in Singapore — choosing the right course, your learning pathway, and where an Advanced Certificate can take you next.",
  },
  {
    icon: HiGlobeAsiaAustralia,
    title: "One-day Singapore tour",
    body: "Get oriented with a complimentary one-day tour of Singapore — see the city, the campus area and student life before classes begin.",
  },
  {
    icon: HiUserGroup,
    title: "Social & networking activities",
    body: "Join a community of international students and tech professionals through regular social and industry-networking activities.",
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
          background: "radial-gradient(circle, rgba(89,235,253,0.4) 0%, transparent 70%)",
        }}
      />
      <Container className="relative">
        <div className="max-w-3xl mb-10">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-tight">
            {heading ?? (
              <>
                Everything you need to{" "}
                <span className="gradient-text">study in Singapore</span>.
              </>
            )}
          </h2>
          <p className="text-(--color-muted) mt-4">
            We don&apos;t just teach the course — we help you get here, settle in, and build a
            network. Full support for foreign students, included.
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
