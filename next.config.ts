const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  compress: true
};
export default nextConfig;