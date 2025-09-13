import bundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // no remotePatterns needed because external images are proxied via /api/og-image
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ["error", "warn"] } : false,
  },
  poweredByHeader: false,
};

export default bundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(nextConfig);