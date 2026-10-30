import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { htmlPath } from "@/lib/html-url";
import type { KeywordFaq, KeywordIntro } from "@/lib/keyword-seo";

/** Render `**keyword**` markers as bold; everything else as plain text.
 *  Headings pass a gradient class so the keyword isn't lighter than the h2. */
export function Emph({
  text,
  strongClass = "text-white font-semibold",
}: {
  text: string;
  strongClass?: string;
}) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className={strongClass}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** Strip `**` markers — for JSON-LD and other plain-text outputs. */
export function plain(text: string) {
  return text.replace(/\*\*/g, "");
}

export function KeywordIntroSection({ intro }: { intro: KeywordIntro }) {
  return (
    <section className="py-12">
      <Container className="max-w-3xl">
        <div className="kicker mb-4">[ {intro.kicker} ]</div>
        <h2 className="font-display text-2xl md:text-3xl font-extrabold mb-5">
          <Emph text={intro.heading} strongClass="gradient-text font-extrabold" />
        </h2>
        <div className="space-y-4 text-(--color-muted) leading-relaxed">
          {intro.paragraphs.map((p, i) => (
            <p key={i}>
              <Emph text={p} />
            </p>
          ))}
        </div>
        {intro.link && (
          <Link
            href={htmlPath(intro.link.href)}
            className="inline-block mt-5 text-sm text-(--color-cyan) hover:underline font-mono"
          >
            {intro.link.label} →
          </Link>
        )}
      </Container>
    </section>
  );
}

export function KeywordFaqSection({
  heading,
  faqs,
}: {
  heading: string;
  faqs: KeywordFaq[];
}) {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: plain(f.q),
      acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
    })),
  };

  return (
    <section className="py-12">
      <Container className="max-w-4xl">
        <div className="text-center mb-8">
          <div className="kicker mb-3">[ FAQ ]</div>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold">
            <Emph text={heading} strongClass="gradient-text font-extrabold" />
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="glass p-5 group [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="cursor-pointer flex justify-between items-center gap-4">
                <h3 className="font-display font-semibold text-base text-white">
                  {plain(f.q)}
                </h3>
                <span className="text-(--color-cyan) font-mono text-lg transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="text-sm text-(--color-muted) leading-relaxed mt-3">
                <Emph text={f.a} />
              </p>
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
