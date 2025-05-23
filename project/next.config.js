/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com'],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = require('path').resolve(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;
