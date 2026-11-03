import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { HiAcademicCap, HiGlobeAlt } from "react-icons/hi2";

const OPTIONS = [
  {
    country: "India", image: "india", icon: HiAcademicCap, heading: "Who Can Apply",
    alt: "Illustration of Indian adult learners studying online together from India",
    points: [
      "Age: 21 years old and above",
      "Open to applicants from any country",
      "Provide your relevant education certificates",
      "English-taught — a short English placement check may apply",
      "Recognition of Prior Learning exemptions available on verification",
    ],
  },
  {
    country: "Vietnam", image: "vietnam", icon: HiGlobeAlt, heading: "Study Online from Anywhere",
    alt: "Illustration of Vietnamese adult learners studying online together from Vietnam",
    points: [
      "Live online classes, three evenings a week (Singapore time)",
      "No relocation and no Student's Pass needed to study online",
      "Already in Singapore? Ask us about in-person sessions, subject to your pass conditions",
      "A Short-Term Visit Pass does not allow you to take a multi-module course in Singapore",
    ],
  },
];

export function AdmissionsSection() {
  return (
    <section id="admissions" className="relative overflow-hidden" aria-labelledby="admissions-title">
      <Container>
        <div className="mb-4">
          <div className="kicker mb-2">[ ADMISSIONS · INTERNATIONAL LEARNERS ]</div>
          <h2 id="admissions-title" className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-extrabold leading-tight">
            A Singapore qualification. <span className="gradient-text">Your world of possibilities.</span>
          </h2>
          <p className="mt-2 text-(--color-muted)">Join live online from India, Vietnam or anywhere in the world. All programmes are taught in English.</p>
        </div>
        <div className="admissions-grid">
          {OPTIONS.map((option) => {
            const Icon = option.icon;
            return (
              <article key={option.country} className="glass overflow-hidden">
                <div className="admissions-photo">
                  <Image src={`/images/admissions/admissions-${option.image}.webp`} alt={option.alt} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" />
                  <div className="admissions-country"><strong>Learn from {option.country}</strong><span>Live online · Singapore-based trainers</span></div>
                </div>
                <div className="p-5">
                  <h3 className="flex items-center gap-3 font-display font-bold text-xl mb-3"><Icon className="w-9 h-9 shrink-0 text-(--color-cyan)" aria-hidden />{option.heading}</h3>
                  <ul className="space-y-2">
                    {option.points.map((point) => <li key={point} className="flex gap-2 text-sm leading-relaxed text-(--color-muted)"><span className="text-(--color-cyan) shrink-0" aria-hidden>✓</span><span>{point}</span></li>)}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
        <div className="admissions-note">
          Under ICA rules, a Student&apos;s Pass is only issued for approved full-time courses. Our programmes are part-time and do not lead to a Student&apos;s Pass. Pass rules are set by Singapore&apos;s Immigration &amp; Checkpoints Authority (ICA).
          <span className="block mt-1 opacity-80">Student images are illustrative.</span>
        </div>
      </Container>
    </section>
  );
}
