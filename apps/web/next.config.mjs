import './src/constants/client-env.mjs';
import './src/constants/server-env.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/random',
      },
    ],
  },
  typescript: {
    tsconfigPath: './tsconfig.build.json',
  },
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
