// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['cdn.sanity.io'],
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   experimental: {
//     webpackBuildWorker: true,
//     serverComponentsExternalPackages: ['@sanity/*'],
//   },
//   webpack: (config, { isServer }) => {
//     // Add null-loader for Sanity Studio files
//     config.module.rules.push({
//       test: /sanity\.(ts|js)/,
//       use: 'null-loader'
//     });

//     // Add custom loader configuration
//     config.module.rules.push({
//       test: /\.svg$/,
//       use: ['@svgr/webpack'],
//     });

//     // Important: Return the modified config
//     return config;
//   }
// }



// module.exports = nextConfig
module.exports = {
  typescript: {
    ignoreBuildErrors: true, // Temporary during fixes
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: "public, max-age=60, stale-while-revalidate=300",
          },
        ],
      },
    ];
  },
};