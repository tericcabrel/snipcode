module.exports = {
  "root": true,
  "extends": "../../.eslintrc.json",
  "ignorePatterns": [
    "postcss.config.js",
    "tailwind.config.js",
    "jest.config.ts",
    "generated.ts",
    '.eslintrc.js',
    'tailwind.config.ts'
  ],
  "parserOptions": {
    "ecmaVersion": 2023,
    "sourceType": "module",
    "project": "tsconfig.json",
    tsconfigRootDir: __dirname,
  }
};
