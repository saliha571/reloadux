import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  experimental: {
    // Avoid devtools bundler issues that can crash pages with:
    // "Could not find the module ... SegmentViewNode ... React Client Manifest"
    devtoolSegmentExplorer: false,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Avoid stale filesystem chunks → "Cannot find module './NNN.js'" (corrupt .next/server)
      delete config.cache;
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: "/wp-admin/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-content/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
