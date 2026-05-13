import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.tertiaryinfotech.com" },
    ],
  },
  async redirects() {
    // Dynamic redirects (from `redirects` DB table) are handled in middleware.
    return [];
  },
};

export default nextConfig;
