const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // Disable in development
  // Prevent multiple generations
  buildExcludes: [/middleware-manifest\.json$/],
  // Prevent webpack watch mode warnings
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config, {
        watch: false,
        watchOptions: {},
      });
    }
    return config;
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // your existing next config
}

module.exports = withPWA(nextConfig)