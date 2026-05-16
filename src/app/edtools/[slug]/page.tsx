import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServiceLeadForm } from "@/components/sections/ServiceLeadForm";
import { EDTOOLS, getEdToolBySlug } from "@/lib/edtools-data";
import { HiArrowUpRight, HiCheck } from "react-icons/hi2";

const SITE_URL = "https://www.tertiaryinfotech.com";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return EDTOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getEdToolBySlug(slug);
  if (!tool) return { title: "EdTool not found" };
  const title = `${tool.name} — EdTool by Tertiary Infotech Academy`;
  const description = tool.description;
  const url = `${SITE_URL}/edtools/${tool.slug}`;
  return {
    title,
    description,
    alternates: { canonical: `/edtools/${tool.slug}` },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      locale: "en_SG",
      siteName: "Tertiary Infotech Academy",
      images: [{ url: "/icon-192.png", width: 192, height: 192, alt: "Tertiary Infotech Academy" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/icon-192.png"],
    },
  };
}

export default async function EdToolDetail({ params }: Props) {
  const { slug } = await params;
  const tool = getEdToolBySlug(slug);
  if (!tool) notFound();

  const sourceTag = `edtool-${tool.slug}`;
  const ghUrl = tool.repo ? `https://github.com/alfredang/${tool.repo}` : null;

  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-24 pb-12 overflow-hidden">
          <div className="grid-bg opacity-60" />
          <div
            className="glow-blob"
            style={{
              top: "-25%",
              left: "20%",
              width: 480,
              height: 480,
              background: "radial-gradient(circle, #5C00E5 0%, transparent 70%)",
            }}
          />
          <Container className="relative">
            <div className="mb-4">
              <Link href="/edtools" className="text-sm text-(--color-cyan) hover:underline">
                ← All EdTools
              </Link>
            </div>
            <div className="kicker mb-3">[ EDTOOL · {tool.category.toUpperCase()} ]</div>
            <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.1] max-w-4xl">
              <span className="gradient-text">{tool.name}</span>
            </h1>
            <p className="mt-5 text-(--color-muted) text-lg max-w-3xl">{tool.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {tool.demoUrl && (
                <a
                  href={tool.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  ▶ Open live demo
                </a>
              )}
              {ghUrl && (
                <a
                  href={ghUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-lg border border-white/10 hover:border-white/30 text-sm font-medium"
                >
                  View on GitHub ↗
                </a>
              )}
              <Link
                href={`/contact?source=${sourceTag}-quote`}
                className="px-5 py-3 rounded-lg border border-(--color-cyan)/40 text-(--color-cyan) hover:bg-(--color-cyan)/10 text-sm font-medium"
              >
                Get a quote →
              </Link>
            </div>
          </Container>
        </section>

        <section className="pb-12">
          <Container>
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-start">
              <div className="space-y-10">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">About this tool</h2>
                  <p className="text-(--color-muted) leading-relaxed">{tool.description}</p>
                </div>

                {tool.stack && tool.stack.length > 0 && (
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Tech stack</h2>
                    <div className="flex flex-wrap gap-2">
                      {tool.stack.map((s) => (
                        <span
                          key={s}
                          className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/80 font-mono"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {tool.features && tool.features.length > 0 && (
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Key features</h2>
                    <ul className="space-y-3">
                      {tool.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-white/85">
                          <HiCheck className="w-5 h-5 text-(--color-cyan) shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                    Who uses {tool.name}?
                  </h2>
                  <p className="text-(--color-muted) leading-relaxed">
                    Singapore training providers, WSQ ATOs, corporate L&amp;D teams, and educational institutes use{" "}
                    {tool.name} inside our AI-LMS-TMS deployment. Whether you need a single tool integrated into your
                    existing classroom workflow or the full {EDTOOLS.length}-tool suite, we scope, deploy, and train
                    your team end-to-end.
                  </p>
                </div>

                <div className="glass rounded-xl p-6">
                  <h3 className="font-display text-lg font-bold mb-3">Three ways to engage</h3>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <Link href={`/contact?source=${sourceTag}-call`} className="text-(--color-cyan) hover:underline">
                        Book a 30-minute scoping call →
                      </Link>
                    </li>
                    <li>
                      <Link href={`/contact?source=${sourceTag}-quote`} className="text-(--color-cyan) hover:underline">
                        Request a custom-build quote →
                      </Link>
                    </li>
                    <li>
                      <Link href="/edtools" className="text-(--color-cyan) hover:underline">
                        Browse the full EdTools catalogue →
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="lg:sticky lg:top-24">
                <ServiceLeadForm
                  source={sourceTag}
                  buttonLabel={`Get ${tool.name} →`}
                  qualifyingPlaceholder={`Tell us how you'd like to use ${tool.name} — class size, integration needs, target go-live…`}
                />
              </div>
            </div>
          </Container>
        </section>

        <section className="relative py-12 border-t border-white/5">
          <Container>
            <div className="flex items-baseline justify-between mb-6 flex-wrap gap-4">
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                More EdTools in <span className="gradient-text">{tool.category}</span>
              </h2>
              <Link href="/edtools" className="text-sm text-(--color-cyan) hover:underline inline-flex items-center gap-1">
                All EdTools <HiArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {EDTOOLS.filter((t) => t.category === tool.category && t.slug !== tool.slug)
                .slice(0, 6)
                .map((t) => (
                  <Link
                    key={t.slug}
                    href={`/edtools/${t.slug}`}
                    className="glass card-hover p-5 group"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-display font-bold text-white group-hover:text-(--color-cyan) transition">
                        {t.name}
                      </h3>
                      <HiArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-(--color-cyan) transition" />
                    </div>
                    <p className="text-sm text-(--color-muted) line-clamp-2 leading-relaxed">
                      {t.description}
                    </p>
                  </Link>
                ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
