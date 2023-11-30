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
  response: z
    .object({
      meta: z.object({
        kind: z.string(),
        etag: z.string(),
        nextPageToken: z.string().optional(),
        regionCode: z.string(),
        pageInfo: z.object({
          totalResults: z.number(),
          resultsPerPage: z.number(),
        }),
      }),
      videos: z.array(
        z.object({
          kind: z.string(),
          etag: z.string(),
          id: z.object({
            kind: z.string(),
            videoId: z.string(),
          }),
          snippet: z.object({
            publishedAt: z.string(),
            channelId: z.string(),
            title: z.string(),
            description: z.string(),
            thumbnails: z.object({
              default: z.object({
                url: z.string().url(),
                width: z.number(),
                height: z.number(),
              }),
            }),
            channelTitle: z.string(),
          }),
        })
      ),
    })
    .merge(KusodekaResponseSchema),
} as const satisfies ApiContract;
