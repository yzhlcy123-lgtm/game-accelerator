import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.dev.coze.site"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lf-coze-web-cdn.coze.cn",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "openfront.io",
        pathname: "/**",
      },
    ],
  },
  compress: true,
  async headers() {
    return [
      {
        source: "/api/proxy/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, OPTIONS",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
