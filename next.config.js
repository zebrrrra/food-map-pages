/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: [
      "maps.googleapis.com",
      "img.icons8.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
