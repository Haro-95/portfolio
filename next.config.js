/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
    optimizeCss: true, // Enable CSS optimization
    optimizePackageImports: [
      'framer-motion',
      'react-icons/fa'
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'], // Enable modern image formats
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header
  generateEtags: true, // Enable ETag generation
  httpAgentOptions: {
    keepAlive: true, // Enable keep-alive
  },
};

module.exports = nextConfig;