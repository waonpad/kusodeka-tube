import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { reqSearchParams } from '@/utils/req-search-params';
import { ApiContract } from './types';

// TODO: parsedは全てundefinedの可能性があるものとして扱われてしまうので修正する

export const cHandler = <T extends ApiContract>(
  contract: T,
  process: (
    req: NextRequest,
    parsed: {
      params?: z.infer<NonNullable<T['params']>>;
      query?: z.infer<NonNullable<T['query']>>;
      body?: z.infer<NonNullable<T['body']>>;
    }
  ) => Promise<NextResponse<z.infer<T['response']>>>
) => {
  return async (
    req: NextRequest,
    { params }: { params?: z.infer<NonNullable<T['params']>> }
  ): Promise<
    NextResponse<
      | {
          error: z.ZodError;
        }
      | z.infer<T['response']>
    >
  > => {
    const parsed: {
      params?: z.infer<NonNullable<T['params']>>;
      query?: z.infer<NonNullable<T['query']>>;
      body?: z.infer<NonNullable<T['body']>>;
    } = {
      params: undefined,
      query: undefined,
      body: undefined,
    };

    if (contract.params) {
      const parsedParams = contract.params.safeParse(params);

      if (!parsedParams.success) {
        return NextResponse.json({ error: parsedParams.error }, { status: 400 });
      }

      parsed.params = parsedParams.data;
    }

    if (contract.query) {
      const parsedQuery = contract.query.safeParse(reqSearchParams(req));

      if (!parsedQuery.success) {
        return NextResponse.json({ error: parsedQuery.error }, { status: 400 });
      }

      parsed.query = parsedQuery.data;
    }

    if (contract.body) {
      const parsedBody = contract.body.safeParse(req.body);

      if (!parsedBody.success) {
        return NextResponse.json({ error: parsedBody.error }, { status: 422 });
      }

      parsed.body = parsedBody.data;
    }

    const response = await process(req, parsed);
    const responseBody = await response.json();

    const parsedResponseBody = contract.response.safeParse(responseBody);

    if (!parsedResponseBody.success) {
      return NextResponse.json({ error: parsedResponseBody.error }, { status: 500 });
    }

    return NextResponse.json(parsedResponseBody.data, response);
  };
};
