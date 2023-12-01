import { z } from 'zod';
import { fetcher } from '@/services/fetcher';
import { ApiContract } from './types';

export const cFetcher = <T extends ApiContract>(contract: T) => {
  return (
    // omit RequestInfo
    _?: undefined,
    init?: Omit<RequestInit, 'method' | 'body'> & {
      params?: z.input<NonNullable<T['params']>>;
      searchParams?: z.input<NonNullable<T['searchParams']>>;
      body?: z.input<NonNullable<T['body']>>;
    }
  ) => {
    const { params, searchParams, body, ...restInit } = init ?? {};

    // TODO: jsonではない場合の処理
    const formattedBody = body ? JSON.stringify(body) : undefined;

    const formattedSearchParams = searchParams ? `?${new URLSearchParams(searchParams)}` : '';

    return fetcher<z.infer<T['response']>>(`${contract.path(params)}${formattedSearchParams}`, {
      ...restInit,
      method: contract.method,
      body: formattedBody,
    });
  };
};
