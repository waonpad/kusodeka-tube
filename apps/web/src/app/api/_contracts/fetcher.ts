import { z } from 'zod';
import { fetcher } from '@/services/fetcher';
import { ApiContract } from './types';

export const cFetcher = <T extends ApiContract>(contract: T) => {
  return (
    // omit RequestInfo
    _?: undefined,
    init?: Omit<RequestInit, 'method' | 'body'> & {
      params?: z.input<NonNullable<T['params']>>;
      query?: z.input<NonNullable<T['query']>>;
      body?: z.input<NonNullable<T['body']>>;
    }
  ) => {
    const { params, query, body, ...restInit } = init ?? {};

    // TODO: jsonではない場合の処理
    const formattedBody = body ? JSON.stringify(body) : undefined;

    const formattedQuery = query ? `?${new URLSearchParams(query)}` : '';

    return fetcher<z.infer<T['response']>>(`${contract.path(params)}${formattedQuery}`, {
      ...restInit,
      method: contract.method,
      body: formattedBody,
    });
  };
};
