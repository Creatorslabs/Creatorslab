/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false, net: false, tls: false };
    }
    config.externals.push("pino-pretty", "encoding");
    return config;
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      // {
      //   source: "/sitemap.xml",
      //   destination: "/api/sitemap",
      // },
    ];
  },

  images: {
    remotePatterns: [
      {
        hostname: "pbs.twimg.com",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
