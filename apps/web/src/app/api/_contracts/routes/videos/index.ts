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
  path: () => hostApi('videos'),
  method: 'GET',
  query: z
    .object({
      url: z.string().startsWith('https://www.youtube.com/watch?v='),
    })
    .merge(KusodekaQuerySchema),
  response: z
    .object({
      video: z.object({
        kind: z.string(),
        etag: z.string(),
        id: z.string(),
        snippet: z.object({
          title: z.string(),
          channelId: z.string(),
          description: z.string(),
          publishedAt: z.string(),
          thumbnails: z.object({
            default: z.object({
              url: z.string().url(),
              width: z.number(),
              height: z.number(),
            }),
          }),
          channelTitle: z.string(),
          tags: z.array(z.string()),
        }),
        contentDetails: z.object({
          duration: z.string(),
        }),
        statistics: z.object({
          viewCount: z.string(),
          likeCount: z.string(),
          favoriteCount: z.string(),
          commentCount: z.string(),
        }),
      }),
    })
    .merge(KusodekaResponseSchema),
} as const satisfies ApiContract;
