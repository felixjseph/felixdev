import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  allowedDevOrigins: ["127.0.0.1"],
  images: { qualities: [75, 90] },
  reactStrictMode: true,
};

export default nextConfig;
