/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['figma-images.com'],
  },
  webpack: (config) => {
    // Handle figma: protocol imports by treating them as external URLs
    config.module.rules.push({
      test: /^figma:/,
      type: 'asset/resource',
      generator: {
        filename: 'static/images/[name][ext]'
      }
    });
    return config;
  },
}

module.exports = nextConfig