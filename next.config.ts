import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        pathname: "/product-images/**", // The wildcard (**) is crucial for matching subpaths
      },
    ],
  },
};

export default nextConfig;
