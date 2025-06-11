const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/landingpage' : '',
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
export default nextConfig;