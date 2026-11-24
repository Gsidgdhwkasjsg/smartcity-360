/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'upload.wikimedia.org'
    ],
  },
};

module.exports = nextConfig;
