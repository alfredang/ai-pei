import { Container } from "@/components/layout/Container";
import { HiAcademicCap } from "react-icons/hi2";

const TRAINERS = [
  {
    name: "Dr. Alfred Ang",
    qualification: "PhD in Electrical Engineering",
    university: "National University of Singapore",
    type: "Full-Time",
    modules: ["CompTIA A+", "CompTIA Security+", "CompTIA Linux+", "CompTIA CySA+ / PenTest+"],
    bio: "A seasoned educator and industry professional with deep expertise in cybersecurity, AI, and electrical engineering. Dr. Ang leads the full curriculum and brings decades of academic and practical experience.",
  },
  {
    name: "Dr. Sivanesan Sivakaruniam",
    qualification: "Graduate Diploma in Business Systems",
    university: "Monash University",
    type: "Part-Time",
    modules: ["CompTIA Security+", "CompTIA CySA+ / PenTest+"],
    bio: "An experienced cybersecurity practitioner with a strong background in business systems and IT security. Dr. Sivanesan specialises in security analysis and penetration testing instruction.",
  },
];

export function TrainersSection() {
  return (
    <section id="trainers" className="relative py-20 overflow-hidden">
      <div className="grid-bg opacity-25" />

      <Container className="relative">
        <div className="text-center mb-14">
          <div className="kicker mb-4">[ OUR FACULTY ]</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05]">
            Meet Our <span className="gradient-text">Trainers</span>
          </h2>
          <p className="mt-4 text-(--color-muted) text-lg max-w-2xl mx-auto">
            Our trainers are experienced educators and industry professionals who bring practical,
            real-world expertise into every lesson.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {TRAINERS.map((trainer) => (
            <div key={trainer.name} className="glass p-8 hover:border-white/15 transition-all group">
              {/* Avatar placeholder */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-(--color-purple)/30 to-(--color-cyan)/30 border border-white/15 flex items-center justify-center shrink-0">
                  <HiAcademicCap className="w-7 h-7 text-(--color-cyan)" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white">{trainer.name}</h3>
                  <span className="text-xs font-mono text-(--color-cyan)/70 uppercase tracking-wider">
                    {trainer.type} Trainer
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-(--color-muted) leading-relaxed mb-5">
                {trainer.bio}
              </p>

              {/* Credentials */}
              <div className="space-y-2.5 mb-5">
                <div className="flex items-start gap-2">
                  <span className="text-xs font-mono text-(--color-muted) uppercase tracking-wider w-24 shrink-0 pt-0.5">
                    Degree
                  </span>
                  <span className="text-sm text-white/80">{trainer.qualification}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs font-mono text-(--color-muted) uppercase tracking-wider w-24 shrink-0 pt-0.5">
                    From
                  </span>
                  <span className="text-sm text-white/80">{trainer.university}</span>
                </div>
              </div>

              {/* Modules taught */}
              <div className="pt-5 border-t border-white/8">
                <div className="text-xs font-mono text-(--color-muted) uppercase tracking-wider mb-3">
                  Modules Taught
                </div>
                <div className="flex flex-wrap gap-2">
                  {trainer.modules.map((mod) => (
                    <span
                      key={mod}
                      className="text-[0.7rem] font-mono px-2.5 py-1 rounded-md bg-white/4 border border-white/8 text-(--color-muted)"
                    >
                      {mod}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
