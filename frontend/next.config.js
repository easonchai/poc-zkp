/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      stream: false,
      path: false,
      crypto: false,
      os: false,
    };
    return config;
  },
};

module.exports = nextConfig;
