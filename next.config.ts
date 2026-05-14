import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Next's standalone tracer doesn't auto-include the optional native
  // subpackages shipped alongside @anthropic-ai/claude-agent-sdk (the
  // linux-x64 / arm64 binary that powers the chatbot subprocess). Force
  // them in so the Docker image isn't missing the binary at runtime.
  outputFileTracingIncludes: {
    "/api/chat": ["./node_modules/@anthropic-ai/**/*"],
    "/api/ai/assist": ["./node_modules/@anthropic-ai/**/*"],
  },
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
