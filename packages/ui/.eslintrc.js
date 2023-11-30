module.exports = {
  extends: ['custom/react-internal'],
  settings: {
    tailwindcss: {
      config: './tailwind.config.js',
    },
  },
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  rules: {
    'react-refresh/only-export-components': 'off',
  },
};
