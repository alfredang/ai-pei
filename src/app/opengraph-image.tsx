import { ImageResponse } from "next/og";

// Branded sitewide Open Graph / Twitter card (1200×630).
// Auto-applied by Next to every route that does not export its own
// `openGraph.images`. Keep colours in sync with the dark theme tokens
// in src/app/globals.css (cyan / purple / amber on near-black).
export const runtime = "nodejs";
export const alt =
  "Tertiary Infotech Academy — Advanced Certificate courses in AI, Cyber Security & Blockchain in Singapore";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#060A14",
          backgroundImage:
            "radial-gradient(circle at 18% 12%, rgba(34,211,238,0.22) 0%, transparent 45%), radial-gradient(circle at 88% 92%, rgba(124,58,237,0.28) 0%, transparent 48%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          color: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: 2,
              color: "#22D3EE",
            }}
          >
            TERTIARY INFOTECH ACADEMY
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "0 14px",
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: 1000,
            }}
          >
            <span>Advanced Certificate Courses in</span>
            <span style={{ color: "#22D3EE" }}>AI,</span>
            <span style={{ color: "#7C3AED" }}>Cyber Security</span>
            <span>&amp;</span>
            <span style={{ color: "#F59E0B" }}>Blockchain</span>
          </div>
          <div style={{ fontSize: 30, color: "#AAA8B1", maxWidth: 920 }}>
            Study in Singapore at a Private Education Institution — for
            international students &amp; career switchers.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 26, color: "#FFFFFF" }}>
            www.tertiaryinfotech.edu.sg
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              fontSize: 22,
              color: "#AAA8B1",
            }}
          >
            <span>Hands-on</span>
            <span style={{ color: "#22D3EE" }}>·</span>
            <span>Industry-recognised</span>
            <span style={{ color: "#7C3AED" }}>·</span>
            <span>Career pathway</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
