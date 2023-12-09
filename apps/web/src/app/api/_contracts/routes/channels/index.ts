import { z } from 'zod';
import { hostApi } from '@/config/url/host-api';
import { KusodekaResponseSchema, KusodekaSearchParamsSchema } from '../../shared';
import { ApiContract } from '../../types';

export const getChannelByURLContract = {
  path: () => hostApi('channels'),
  method: 'GET',
  searchParams: z
    .object({
      url: z.string().startsWith('https://www.youtube.com/'),
    })
    .merge(KusodekaSearchParamsSchema),
  response: z
    .object({
      channel: z.object({
        kind: z.string(),
        etag: z.string(),
        id: z.string(),
        snippet: z.object({
          title: z.string(),
          description: z.string(),
          customUrl: z.string(),
          publishedAt: z.string(),
          thumbnails: z.object({
            default: z.object({
              url: z.string().url(),
              width: z.number(),
              height: z.number(),
            }),
            medium: z.object({
              url: z.string().url(),
              width: z.number(),
              height: z.number(),
            }),
            high: z.object({
              url: z.string().url(),
              width: z.number(),
              height: z.number(),
            }),
          }),
        }),
        statistics: z.object({
          viewCount: z.string(),
          subscriberCount: z.string(),
          hiddenSubscriberCount: z.boolean(),
          videoCount: z.string(),
        }),
        brandingSettings: z.object({
          channel: z.object({
            keywords: z.string().optional(),
          }),
          image: z
            .object({
              bannerExternalUrl: z.string().url().optional(),
            })
            .optional(),
        }),
      }),
    })
    .merge(KusodekaResponseSchema),
} as const satisfies ApiContract;
