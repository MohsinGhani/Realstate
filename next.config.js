/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["antd"],
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "real-estate-1.s3.us-east-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = {
  ...nextConfig,
};
