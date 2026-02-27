import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

// Disable PWA for static export - causing hydration issues
const withPWA = withPWAInit({
  dest: "public",
  disable: true,
  register: false,
});

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/fitness-ledger-v2",
  images: {
    unoptimized: true,
  },
};

export default withPWA(nextConfig);
