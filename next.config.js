/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-ninjas.com",
        port: "",
        pathname: "/images/dogs/**",
      },
    ],
  },
};

module.exports = nextConfig;
