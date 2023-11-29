import { z } from 'zod';

export const KusodekaQuerySchema = z.object({
  scale: z.coerce.number(),
});

export const KusodekaResponseSchema = z.object({
  // TODO: KUSODEKA の文字列を返す
  // message: z.string(),
});
