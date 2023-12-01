import { z } from 'zod';

export const KusodekaSearchParamsSchema = z.object({
  scale: z.coerce.number().min(Number.MIN_SAFE_INTEGER).max(Number.MAX_SAFE_INTEGER),
});

export const KusodekaResponseSchema = z.object({
  // TODO: KUSODEKA の文字列を返す
  // message: z.string(),
});
