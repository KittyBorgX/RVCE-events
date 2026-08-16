import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/storybook",
        destination: "/storybook/index.html",
      },
      {
        source: "/storybook/",
        destination: "/storybook/index.html",
      },
    ];
  },
};

export default nextConfig;
