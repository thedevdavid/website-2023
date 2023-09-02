// @ts-check

const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/business-of-it",
        destination: "https://developreneur.davidlevai.com",
        permanent: true,
      },
      {
        source: "/blog/glassmorphism-with-tailwind-css-under-60-seconds",
        destination: "/posts/tailwind-glassmorphism",
        permanent: true,
      },
      {
        source: "/content/glassmorphism-with-tailwind-css-under-60-seconds",
        destination: "/posts/tailwind-glassmorphism",
        permanent: true,
      },
      {
        source: "/glassmorphism-with-tailwind-css-under-60-seconds",
        destination: "/posts/tailwind-glassmorphism",
        permanent: true,
      },
      {
        source: "/tailwind-glassmorphism",
        destination: "/posts/tailwind-glassmorphism",
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
