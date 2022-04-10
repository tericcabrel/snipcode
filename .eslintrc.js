module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:typescript-sort-keys/recommended'
  ],
  plugins: [
    'sort-destructure-keys',
    'sort-keys-fix',
    'typescript-sort-keys',
    'import'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: "tsconfig.json",
  },
  ignorePatterns: ['commitlint.config.js', '.prettierrc.js'],
  env: {
    es6: true,
    node: true,
    jest: true,
    commonjs: true
  },
  rules: {
    'no-var': 'warn',
    semi: 'warn',
    indent: ['warn', 2, { SwitchCase: 1 }],
    'no-multi-spaces': 'warn',
    'space-in-parens': 'warn',
    'no-multiple-empty-lines': 'warn',
    'prefer-const': 'warn',
    'no-use-before-define': 'warn',
    'max-len': ['warn', 120],
    'import/order': 'error',
    'import/newline-after-import': ['error', { count: 1 }],
    'sort-imports': ['error',  {
      'ignoreCase': true,
      'ignoreDeclarationSort': true
    }],
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/class-name-casing': 'off',
    '@typescript-eslint/ban-ts-comment': [
      'warn',
      {
        'ts-ignore': 'allow-with-description',
        minimumDescriptionLength: 10
      }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'sort-destructure-keys/sort-destructure-keys': 2,
    '@typescript-eslint/member-ordering': 'warn',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
    '@typescript-eslint/prefer-optional-chain': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    'prefer-destructuring': ['warn'],
    'prefer-template': 'warn',
    'object-shorthand': 'warn',
    'newline-after-var': ['warn', 'always'],
    curly: 'warn',
    'sort-keys-fix/sort-keys-fix': 'warn',
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    'new-cap': 'off',
    'no-console': 'off',
    'no-else-return': 'error',
    'no-eval': 'error',
    'no-mixed-operators': 'off',
    'no-nested-ternary': 'error',
    'no-param-reassign': 'error',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'off',
    'ods-use-this': 'off',
  },
};
