import "./globals.css";
import type { Metadata } from "next";
import { Inter, Exo_2, JetBrains_Mono } from "next/font/google";
import { ChatBot } from "@/components/ui/ChatBot";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans-import", display: "swap" });
const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display-import",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-import",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tertiaryinfotech.com"),
  title: {
    default: "Tertiary Infotech — AI-LMS-TMS for WSQ & TPQA Compliance",
    template: "%s | Tertiary Infotech",
  },
  description:
    "Tertiary Infotech provides AI-powered LMS and TMS solutions for WSQ and TPQA compliant training providers in Singapore.",
  openGraph: {
    type: "website",
    siteName: "Tertiary Infotech",
    locale: "en_SG",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${exo2.variable} ${mono.variable}`}>
      <body className="min-h-screen antialiased">
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
