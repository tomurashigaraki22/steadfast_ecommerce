import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
}};

export default nextConfig;
