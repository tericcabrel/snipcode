import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    clean: true,
    entry: {
      style: 'src/styles/index.css',
      script: 'src/scripts/index.ts',
    },
    minify: !options.watch,
    outDir: 'build',
    platform: 'browser',
    sourcemap: true,
    splitting: false,
  };
});
