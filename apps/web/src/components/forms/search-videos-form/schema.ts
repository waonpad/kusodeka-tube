import { z } from 'zod';
import { searchVideosContract } from '@/app/api/_contracts/routes/videos/search';
import { describeZodSchema } from '@/utils/zod/describe-zod-schema';

export const searchVideosFormSchema = describeZodSchema(
  z.object({
    q: searchVideosContract.searchParams._def.schema.shape.q.unwrap(),
    scale: searchVideosContract.searchParams._def.schema.shape.scale,
    /**
     * 本来maxResultsはnumberだが、auto-formのためにenumにしている \
     * 最終的にクエリパラメータにするので、問題ない
     * @see searchVideosContract.searchParams._def.schema.shape.maxResults
     */
    maxResults: z.enum(['10', '20', '30', '40', '50']),
  }),
  {
    q: '検索ワード',
  }
);
