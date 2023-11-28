import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const serverEnv = createEnv({
  server: {
    APP_ENV: z.enum(['development', 'production', 'test']),
    GCLOUD_API_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: {},
});
