import { Container } from "@/components/layout/Container";

/** Shared so the homepage can build matching FAQPage JSON-LD. */
export const HOME_FAQ = [
  {
    q: "Can foreigners study cybersecurity, AI, blockchain or quantum computing in Singapore?",
    a: "Yes. Our programmes are designed for international professionals and students. All courses are taught in English, and we guide you on the visa or pass options that fit part-time or full-time study so you can train in Singapore with confidence.",
  },
  {
    q: "Are the courses taught in English?",
    a: "Every programme is delivered entirely in English. Singapore is an English-speaking country, so you can study, work and live here comfortably without learning another language first.",
  },
  {
    q: "Are the certifications globally recognised?",
    a: "Yes. Our future-tech programmes lead to globally portable, industry-aligned qualifications [PLACEHOLDER: name your accreditation and certification bodies] that are valued by employers in Singapore, across Asia and worldwide.",
  },
  {
    q: "What does it cost, and is funding available for foreigners?",
    a: "Course fees vary by programme [PLACEHOLDER: insert fee ranges]. Most government subsidies are reserved for Singapore Citizens and PRs, but international learners are eligible for transparent self-funded pricing and any instalment options we offer. Speak to our team for an exact quote.",
  },
  {
    q: "Will studying here help me get a tech job in Singapore or Asia?",
    a: "Singapore is Asia's #1 tech and fintech hub, home to the regional offices of major MNCs, startups and government tech agencies. Your skills are built to be job-ready and globally portable, and we share guidance on career pathways and work-pass options across the region.",
  },
];

export function FaqSection() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="relative py-20 overflow-hidden">
      <Container className="max-w-4xl relative">
        <div className="text-center mb-12">
          <div className="kicker mb-3">[ FAQ ]</div>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05]">
            Foreign Learner <span className="gradient-text">Questions</span>
          </h2>
          <p className="mt-4 text-(--color-muted) text-lg max-w-2xl mx-auto">
            Everything international students ask about studying tech in Singapore.
          </p>
        </div>

        <div className="space-y-3">
          {HOME_FAQ.map((f) => (
            <details
              key={f.q}
              className="glass p-5 group [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="cursor-pointer flex justify-between items-center gap-4">
                <span className="font-display font-semibold text-base text-white">{f.q}</span>
                <span className="text-(--color-cyan) font-mono text-lg transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="text-sm text-(--color-muted) leading-relaxed mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </section>
  );
}
