module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'next',
    'turbo',
    'plugin:tailwindcss/recommended',
    'plugin:vitest/recommended',
    'prettier',
  ],
  plugins: ['unused-imports', 'vitest'],
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'out/',
    'public/',
    '.prettierrc.js',
    '.eslintrc.js',
    'tailwind.config.js',
    'next.config.js',
    'postcss.config.js',
    'jest.config.js',
    'lint-staged.config.js',
    '**/*.mjs',
  ],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'turbo/no-undeclared-env-vars': 'off', // process.env.なんとか を許可する
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    'unused-imports/no-unused-imports-ts': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: '{react,react-dom/**,react-router-dom}',
            group: 'builtin',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'vitest/consistent-test-it': ['error', { fn: 'it' }],
  },
};
