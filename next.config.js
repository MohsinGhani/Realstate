/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["antd"],
  reactStrictMode: true,

  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
