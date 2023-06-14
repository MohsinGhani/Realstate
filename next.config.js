/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["antd"],
  reactStrictMode: false,

  experimental: {
    appDir: true,
  },
};

module.exports = {
  ...nextConfig,
};
