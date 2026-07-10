import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "strapi.monis.rent",
        port: "",
        pathname: "/uploads/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
