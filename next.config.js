/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '',
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    unoptimized: true
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  compress: true
};

module.exports = nextConfig;