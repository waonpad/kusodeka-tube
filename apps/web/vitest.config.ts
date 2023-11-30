import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['src/**/*.test.{js,ts,jsx,tsx}'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    setupFiles: ['src/test/setup-tests.ts'],
  },
});
