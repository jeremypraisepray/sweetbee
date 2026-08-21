import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Photography ships as pre-derived AVIF/WebP/JPEG from scripts/build-assets.mjs,
  // so the runtime optimizer never runs and every page is fully static.
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
