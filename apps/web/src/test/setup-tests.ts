import '@testing-library/jest-dom';

import { loadEnvConfig } from '@next/env';

/**
 * @description
 * これを実行しないと環境変数が読み込まれない
 */
export const setupEnv = async (): Promise<void> => {
  loadEnvConfig(process.env.PWD || process.cwd());
};

setupEnv();
