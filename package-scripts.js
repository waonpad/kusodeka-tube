const path = require('path');

const root = (target) => path.resolve(__dirname, target);

try {
  require('dotenv').config({ path: root('.env') });
} catch (e) {
  console.log('dotenv is not installed');
}
const env = process.env;

const webPath = root('apps/web');

const ciWebPath = root('out/apps/web');

module.exports = {
  scripts: {
    // 事前準備
    prepare: {
      default: `nps prepare.deps prepare.env`,
      env: {
        default: `node ${root('tool/copy-env.js')} --dir ./ ./apps/* ./packages/*`,
      },
      deps: `yarn install --frozen-lockfile && yarn husky install`,
      ci: {
        web: `npx turbo prune web && cd out && yarn install --frozen-lockfile`,
      },
    },
    test: {
      default: `nps test.web`,
      web: `cd ${webPath} && yarn test`,
      ci: {
        default: `nps test.ci.web`,
        web: `cd ${ciWebPath} && yarn test:ci`,
      },
      watch: {
        default: `nps test.watch.web`,
        web: `cd ${webPath} && yarn test:watch`,
      },
    },
    build: {
      default: 'npx turbo run build',
      ci: {
        web: 'cd out && npm run build',
      },
    },
    lint: {
      default: `nps lint.eslint lint.style lint.prettier`,
      eslint: `turbo lint`,
      style: `yarn stylelint "**/*.{css,scss}" --fix`,
      prettier: `yarn fornmat`,
    },
    // 開発サーバー起動
    dev: 'npx turbo run dev --parallel --no-daemon',
    // git関連
    g: {
      a: `node ${root('tool/git-easy-add.js')}`,
    },
  },
};
