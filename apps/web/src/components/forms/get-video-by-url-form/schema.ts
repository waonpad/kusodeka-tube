import { z } from 'zod';
import { getVideoByURLContract } from '@/app/api/_contracts/routes/videos';
import { describeZodSchema } from '@/utils/zod/describe-zod-schema';

export const getVideoByURLFormSchema = describeZodSchema(
  z.object({
    url: getVideoByURLContract.searchParams.shape.url,
    scale: getVideoByURLContract.searchParams.shape.scale,
  }),
  {
    url: '動画URL',
  }
);
