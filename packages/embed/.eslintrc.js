module.exports = {
  root: true,
  extends: '../../.eslintrc.json',
  ignorePatterns: [
    'dist',
    'build',
    'tsup.config.ts',
    'env.d.ts',
    'src/server/public',
    'jest.config.ts',
    '.eslintrc.js',
  ],
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
