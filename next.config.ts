import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
 