import * as fs from 'fs';
import * as path from 'path';
import { defineConfig } from 'tsup';

const copyFile = async () => {
  const buildStylePath = path.resolve(__dirname, 'build', 'style.css');
  const buildScriptPath = path.resolve(__dirname, 'build', 'script.js');

  const serverPublicFolderPath = path.resolve(__dirname, 'src/server/public');
  const shariganPublicFolderPath = path.resolve(serverPublicFolderPath, 'sharingan');

  if (!fs.existsSync(shariganPublicFolderPath)) {
    fs.mkdirSync(shariganPublicFolderPath);
  }

  fs.cpSync(buildStylePath, path.resolve(shariganPublicFolderPath, 'style.css'));
  fs.cpSync(buildScriptPath, path.resolve(shariganPublicFolderPath, 'script.js'));
};

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
    sourcemap: false,
    splitting: false,
    onSuccess: () => copyFile(),
  };
});
