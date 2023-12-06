import './src/constants/client-env.mjs';
import './src/constants/server-env.mjs';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

/** @type {import('next').NextConfig} */
const nextConfig = async (phase, { defaultConfig }) => ({
  ...defaultConfig,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/random',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  typescript: {
    tsconfigPath: './tsconfig.build.json',
  },
  experimental: {
    typedRoutes: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx']
    .map((extension) => {
      const isDevServer = phase === PHASE_DEVELOPMENT_SERVER;
      return isDevServer ? [`dev.${extension}`, extension] : extension;
    })
    .flat(),
});

export default nextConfig;
