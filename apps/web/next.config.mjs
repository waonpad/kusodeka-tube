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
      {
        protocol: 'https',
        hostname: 'yt3.ggpht.com',
      },
      {
        protocol: 'https',
        hostname: 'yt3.googleusercontent.com',
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
  compiler: {
    removeConsole: process.env.APP_ENV === "production"
  },
});

export default nextConfig;
