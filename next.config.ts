module.exports = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    webpackBuildWorker: true,
    serverComponentsExternalPackages: ['@sanity/*'],
  },
  webpack: (config) => {
    // Bypass sanity config validation
    config.module.rules.push({
      test: /sanity\.config\.(js|ts)/,
      use: 'null-loader',
    });
    return config;
  }
}