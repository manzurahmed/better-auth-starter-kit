import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["lucide-react"],
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
      {
        protocol: "https",
        hostname: "floatui.com",
      },
      // If you're using relative paths for local images
      {
        protocol: "https",
        hostname: "**", // Wildcard for all domains (use cautiously)
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    contentDispositionType: "inline",
  },
  turbopack: {
    resolveExtensions: [".ts", ".tsx", ".js", ".jsx", ".mjs"],
  },
};

export default nextConfig;
