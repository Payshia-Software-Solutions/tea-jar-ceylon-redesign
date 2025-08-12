import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['content-provider.payshia.com', 'teajarceylon.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'content-provider.payshia.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.payshia.com', // wildcard match
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
