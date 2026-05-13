import "./globals.css";
import type { Metadata } from "next";
import { ChatBot } from "@/components/ui/ChatBot";

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
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
