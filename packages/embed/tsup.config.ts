import * as fs from 'fs';
import * as path from 'path';
import { defineConfig } from 'tsup';

const copyFile = async (isProd: boolean) => {
  if (isProd) {
    return;
  }

  const buildStylePath = path.resolve(__dirname, 'build', 'style.css');
  const buildScriptPath = path.resolve(__dirname, 'build', 'script.js');

  const serverPublicFolderPath = path.resolve(__dirname, 'src/server/public');
  const snipcodePublicFolderPath = path.resolve(serverPublicFolderPath, 'snipcode');

  if (!fs.existsSync(snipcodePublicFolderPath)) {
    fs.mkdirSync(snipcodePublicFolderPath, { recursive: true });
  }

  fs.cpSync(buildStylePath, path.resolve(snipcodePublicFolderPath, 'style.css'));
  fs.cpSync(buildScriptPath, path.resolve(snipcodePublicFolderPath, 'script.js'));
};

export default defineConfig((options) => {
  const isProd = !options.watch;

  const scriptEntryFile = isProd ? 'script.min' : 'script';
  const styleEntryFile = isProd ? 'style.min' : 'style';

  return {
    clean: true,
    entry: {
      [styleEntryFile]: 'src/styles/index.css',
      [scriptEntryFile]: 'src/scripts/index.ts',
    },
    minify: !options.watch,
    outDir: 'build',
    platform: 'browser',
    sourcemap: !options.watch,
    splitting: false,
    onSuccess: () => copyFile(isProd),
  };
});
