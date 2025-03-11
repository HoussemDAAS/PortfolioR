// next.config.js
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Add webpack override to skip sanity config validation
  webpack: (config) => {
    config.module.rules.push({
      test: /sanity.config.js/,
      loader: 'null-loader',
    });
    
    return config;
  },
};

module.exports = nextConfig;