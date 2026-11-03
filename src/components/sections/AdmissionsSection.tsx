import { Container } from "@/components/layout/Container";

export function AdmissionsSection() {
  return (
    <section id="admissions" className="relative py-4 overflow-hidden">
      <div
        className="glow-blob"
        style={{
          bottom: "10%",
          right: "0%",
          width: 480,
          height: 480,
          background: "radial-gradient(circle, #3CE07C 0%, transparent 60%)",
          opacity: 0.07,
        }}
      />

      <Container className="relative">
        <div className="text-center mb-8">
          <div className="kicker mb-4">[ ADMISSIONS ]</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05]">
            Admissions for <span className="gradient-text">International Learners</span>
          </h2>
          <p className="mt-4 text-(--color-muted) text-lg max-w-2xl mx-auto">
            A simple, foreigner-friendly path to a Singapore tech qualification — taught live
            online, so you can study from your home country.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Who can apply */}
          <div className="glass p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🎓</span>
              <h3 className="font-display font-bold text-xl text-white">Who Can Apply</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Age: 21 years old and above",
                "Open to applicants from any country",
                "Provide your relevant education certificates",
                "English-taught — a short English placement check may apply",
                "Recognition of Prior Learning exemptions available on verification",
              ].map((req) => (
                <li key={req} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-cyan) shrink-0 mt-2" />
                  <span className="text-sm text-white/80 leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Online study & passes — wording follows ICA rules */}
          <div className="glass p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🌏</span>
              <h3 className="font-display font-bold text-xl text-white">Study Online from Anywhere</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Live online classes, three evenings a week (Singapore time)",
                "No relocation and no Student's Pass needed to study online",
                "Already in Singapore? Ask us about in-person sessions, subject to your pass conditions",
                "A Short-Term Visit Pass does not allow you to take a multi-module course in Singapore",
              ].map((req) => (
                <li key={req} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-amber) shrink-0 mt-2" />
                  <span className="text-sm text-white/80 leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 p-4 rounded-lg bg-white/3 border border-white/6">
              <p className="text-xs text-(--color-muted) leading-relaxed">
                Under ICA rules, a Student&apos;s Pass is only issued for approved full-time courses.
                Our programmes are part-time and do not lead to a Student&apos;s Pass. Pass rules are
                set by Singapore&apos;s Immigration &amp; Checkpoints Authority (ICA).
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
