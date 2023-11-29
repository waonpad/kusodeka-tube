import { z } from 'zod';
import { hostApi } from '@/config/url/host-api';
import { KusodekaQuerySchema, KusodekaResponseSchema } from '../../../shared';
import { ApiContract } from '../../../types';

export const searchVideosContract = {
  path: () => hostApi('/videos/search'),
  method: 'GET',
  /**
   * @see https://github.com/Tenpi/youtube.ts/blob/master/types/SearchTypes.ts#L3
   * @description
   * This schema ensures only the necessary elements from the above link types \
   * If you edit this schema, please make sure to meet the above link types
   */
  query: z
    .object({
      q: z.string().optional(),
      maxResults: z.number().max(50).default(10),
      pageToken: z.string().optional(),
    })
    .merge(KusodekaQuerySchema),
  // TODO: 後でスキーマを書く
  // 外部APIのような巨大なレスポンスもやらないといけないのは面倒だな・・・
  response: z
    .object({
      videos: z.any(),
    })
    .merge(KusodekaResponseSchema),
} as const satisfies ApiContract;
