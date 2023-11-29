import { z } from 'zod';
import { hostApi } from '@/config/url/host-api';
import { KusodekaQuerySchema, KusodekaResponseSchema } from '../../shared';
import { ApiContract } from '../../types';

export const getChannelByURLContract = {
  path: () => hostApi('/channels'),
  method: 'GET',
  query: z
    .object({
      url: z.string().startsWith('https://www.youtube.com/'),
    })
    .merge(KusodekaQuerySchema),
  // TODO: 後でスキーマを書く
  // 外部APIのような巨大なレスポンスもやらないといけないのは面倒だな・・・
  response: z
    .object({
      channel: z.any(),
    })
    .merge(KusodekaResponseSchema),
} as const satisfies ApiContract;
