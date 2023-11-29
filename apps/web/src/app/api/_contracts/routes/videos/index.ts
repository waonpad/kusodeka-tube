import { z } from 'zod';
import { hostApi } from '@/config/url/host-api';
import { AdditionalVideoPart } from '@/lib/youtube-ts';
import { KusodekaQuerySchema, KusodekaResponseSchema } from '../../shared';
import { ApiContract } from '../../types';

export const additionalVideoPart = [
  'snippet',
  'contentDetails',
  'statistics',
] satisfies AdditionalVideoPart[];

export const getVideoByURLContract = {
  path: () => hostApi('/videos'),
  method: 'GET',
  query: z
    .object({
      url: z.string().startsWith('https://www.youtube.com/watch?v='),
    })
    .merge(KusodekaQuerySchema),
  // TODO: 後でスキーマを書く
  // 外部APIのような巨大なレスポンスもやらないといけないのは面倒だな・・・
  response: z
    .object({
      video: z.any(),
    })
    .merge(KusodekaResponseSchema),
} as const satisfies ApiContract;
