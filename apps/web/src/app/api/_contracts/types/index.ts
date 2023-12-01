import { HTTP_METHOD } from 'next/dist/server/web/http';
import { z } from 'zod';

export type ApiContract = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  path: (params: any) => string;
  method: HTTP_METHOD;
  params?: z.ZodType;
  searchParams?: z.ZodType;
  body?: z.ZodType;
  response: z.ZodType;
};
