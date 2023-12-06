import { z } from 'zod';
import { hostApi } from '@/config/url/host-api';
import { KusodekaSearchParamsSchema, KusodekaResponseSchema } from '../../../shared';
import { ApiContract } from '../../../types';

const SPECIFY_EITHER_Q_OR_PAGE_TOKEN = 'Specify either q or pageToken';

export const searchVideosContract = {
  path: () => hostApi('videos/search'),
  method: 'GET',
  /**
   * @see https://github.com/Tenpi/youtube.ts/blob/master/types/SearchTypes.ts#L3
   * @description
   * This schema ensures only the necessary elements from the above link types \
   * If you edit this schema, please make sure to meet the above link types
   */
  searchParams: z
    .object({
      q: z.string().optional(),
      maxResults: z.coerce.number().max(50).default(10),
      pageToken: z.string().optional(),
    })
    .merge(KusodekaSearchParamsSchema)
    .superRefine((values, ctx) => {
      /**
       * refineを使った場合のshape方法
       * @see https://github.com/colinhacks/zod/issues/2056
       */

      // qとpageTokenの両方が指定されている場合はエラー
      if (!!values.q && !!values.pageToken) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: SPECIFY_EITHER_Q_OR_PAGE_TOKEN,
          path: ['q'],
        });

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: SPECIFY_EITHER_Q_OR_PAGE_TOKEN,
          path: ['pageToken'],
        });
      }

      // qとpageTokenのどちらも指定されていない場合はエラー
      if (!values.q && !values.pageToken) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: SPECIFY_EITHER_Q_OR_PAGE_TOKEN,
          path: ['q'],
        });

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: SPECIFY_EITHER_Q_OR_PAGE_TOKEN,
          path: ['pageToken'],
        });
      }
    }),
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
