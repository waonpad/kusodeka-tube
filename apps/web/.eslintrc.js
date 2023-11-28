module.exports = {
  root: true, // これが無いと上層を探しに行ってしまう
  extends: ['custom/next'],
  parserOptions: {
    project: './tsconfig.json',
  },
};
