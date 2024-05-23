module.exports = {
  root: true,
  extends: '../../.eslintrc.json',
  ignorePatterns: ['jest.config.ts', '.eslintrc.js'],
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
