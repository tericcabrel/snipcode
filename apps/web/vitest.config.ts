import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['./src/**/*.test.(ts|tsx)'],
    exclude: ['./.next/', './node_modules/'],
    coverage: {
      provider: 'v8',
      include: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
      exclude: ['./.next/', './node_modules/'],
    },
  },
});
