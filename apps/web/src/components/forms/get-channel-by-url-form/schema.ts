import { z } from 'zod';
import { getChannelByURLContract } from '@/app/api/_contracts/routes/channels';
import { describeZodSchema } from '@/utils/zod/describe-zod-schema';

export const getChannelByURLFormSchema = describeZodSchema(
  z.object({
    url: getChannelByURLContract.searchParams.shape.url,
    scale: getChannelByURLContract.searchParams.shape.scale,
  }),
  {
    url: 'チャンネルURL',
  }
);
