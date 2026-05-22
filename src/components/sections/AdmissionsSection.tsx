import { Container } from "@/components/layout/Container";

export function AdmissionsSection() {
  return (
    <section id="admissions" className="relative py-20 overflow-hidden">
      <div
        className="glow-blob"
        style={{
          bottom: "10%",
          right: "0%",
          width: 480,
          height: 480,
          background: "radial-gradient(circle, #59EBFD 0%, transparent 60%)",
          opacity: 0.07,
        }}
      />

      <Container className="relative">
        <div className="text-center mb-14">
          <div className="kicker mb-4">[ ADMISSIONS ]</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05]">
            Entry <span className="gradient-text">Requirements</span>
          </h2>
          <p className="mt-4 text-(--color-muted) text-lg max-w-2xl mx-auto">
            Our programme welcomes Singapore Citizens, PRs, and work permit holders.
            Flexible, career-focused qualifications for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Local students */}
          <div className="glass p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🇸🇬</span>
              <h3 className="font-display font-bold text-xl text-white">Local Students</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Age: 21 years old and above",
                "Language: At least C6 for GCE \"O\" Level English",
                "Academic: At least C6 for GCE \"O\" Level in any 3 subjects",
                "Applicants lacking English proficiency must complete the English Proficiency Placement Test",
              ].map((req) => (
                <li key={req} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-cyan) shrink-0 mt-2" />
                  <span className="text-sm text-white/80 leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* International students */}
          <div className="glass p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🌏</span>
              <h3 className="font-display font-bold text-xl text-white">International Students</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Age: 21 years old and above",
                "Provide all relevant education certificates",
                "May be asked to sit for an English placement test before enrolment",
                "Recognition of Prior Learning exemptions may be granted upon verification",
              ].map((req) => (
                <li key={req} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-amber) shrink-0 mt-2" />
                  <span className="text-sm text-white/80 leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 p-4 rounded-lg bg-white/3 border border-white/6">
              <p className="text-xs text-(--color-muted) leading-relaxed">
                International students pursuing part-time programmes will need an Employment Pass,
                S Pass, Work Permit, Dependent&apos;s Pass or Long-Term Visit Pass.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
