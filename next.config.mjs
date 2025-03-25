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
