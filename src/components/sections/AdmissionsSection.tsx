import { Container } from "@/components/layout/Container";

export function AdmissionsSection() {
  return (
    <section id="admissions" className="relative py-7 overflow-hidden">
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
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05]">
            Admissions for <span className="gradient-text">International Learners</span>
          </h2>
          <p className="mt-4 text-(--color-muted) text-lg max-w-2xl mx-auto">
            A simple, foreigner-friendly path to studying tech in Singapore — with guidance on
            the visa and pass options that fit your plans.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Who can apply */}
          <div className="glass p-8">
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

          {/* Visa & relocation */}
          <div className="glass p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🌏</span>
              <h3 className="font-display font-bold text-xl text-white">Visa &amp; Relocation</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Guidance on the right pass for your study plan",
                "Part-time study suits Employment Pass / S Pass holders already in Singapore",
                "Support documents for your visa or pass application",
                "Practical relocation tips — housing, banking and settling in",
              ].map((req) => (
                <li key={req} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-amber) shrink-0 mt-2" />
                  <span className="text-sm text-white/80 leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 p-4 rounded-lg bg-white/3 border border-white/6">
              <p className="text-xs text-(--color-muted) leading-relaxed">
                Pass eligibility is set by Singapore&apos;s authorities and depends on your
                circumstances.
                Our admissions team will advise you on the best route.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
