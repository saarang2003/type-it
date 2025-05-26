import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  sassOptions: {
    additionalData: `$var: red;`,
  },
};

export default nextConfig;
