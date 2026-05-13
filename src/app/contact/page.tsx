import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/sections/ContactForm";
import { HiMapPin, HiEnvelope, HiPhone, HiClock } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Contact Us — Tertiary Infotech",
  description:
    "Get in touch with Tertiary Infotech Pte Ltd — 12 Woodlands Square, #07-85 Woods Square Tower 1, Singapore 737715. Phone, email, WhatsApp, and Google Map location.",
};

const ADDRESS_QUERY = encodeURIComponent(
  "Tertiary Infotech Pte Ltd, 12 Woodlands Square, #07-85 Woods Square Tower 1, Singapore 737715",
);

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="py-10">
          <Container>
            <div className="max-w-3xl mb-10">
              <div className="kicker mb-4">[ CONTACT ]</div>
              <h1 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05]">
                Let&apos;s build something <span className="gradient-text">together</span>.
              </h1>
              <p className="mt-5 text-(--color-muted) text-lg">
                Reach out for a demo, a quote, or a quick conversation. We reply
                within one business day.
              </p>
            </div>

            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 mb-12">
              <div className="glass p-7 rounded-2xl space-y-5">
                <div className="flex items-start gap-3">
                  <HiMapPin className="w-5 h-5 mt-0.5 shrink-0 text-(--color-cyan)" />
                  <div>
                    <div className="font-display font-bold text-white mb-1">
                      Tertiary Infotech Pte Ltd
                    </div>
                    <div className="text-sm text-(--color-muted) leading-relaxed">
                      12 Woodlands Square, #07-85
                      <br />
                      Woods Square Tower 1
                      <br />
                      Singapore 737715
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <HiPhone className="w-5 h-5 mt-0.5 shrink-0 text-(--color-cyan)" />
                  <div className="text-sm">
                    <a href="tel:+6561000613" className="text-white hover:text-(--color-cyan) transition block">
                      +65 6100 0613
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaWhatsapp className="w-5 h-5 mt-0.5 shrink-0 text-(--color-cyan)" />
                  <a
                    href="https://wa.me/6588666375"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white hover:text-(--color-cyan) transition"
                  >
                    +65 8866 6375 (WhatsApp)
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <HiEnvelope className="w-5 h-5 mt-0.5 shrink-0 text-(--color-cyan)" />
                  <a
                    href="mailto:enquiry@tertiaryinfotech.com"
                    className="text-sm text-white hover:text-(--color-cyan) transition"
                  >
                    enquiry@tertiaryinfotech.com
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <HiClock className="w-5 h-5 mt-0.5 shrink-0 text-(--color-cyan)" />
                  <div className="text-sm text-(--color-muted)">
                    Mon – Fri · 9:00 am – 6:00 pm
                    <br />
                    Closed on weekends &amp; public holidays
                  </div>
                </div>

                <div className="pt-2 text-xs text-(--color-muted) font-mono">
                  UEN 201200606W
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-white/10 min-h-[400px]">
                <iframe
                  title="Tertiary Infotech location"
                  src={`https://www.google.com/maps?q=${ADDRESS_QUERY}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: "absolute", inset: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </Container>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
