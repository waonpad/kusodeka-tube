import { ZodError } from 'zod';
import { errors } from '@/errors';
import { HttpResponse } from './types';

export const fetcher = <T>(input: RequestInfo, init?: RequestInit) => {
  return fetch(input, init)
    .then(transformResponse<T>())
    .catch((error) => {
      console.log('fetcher: error', error);
      throw error;
    });
};

export const transformResponse = <T>() => {
  return async (res: Response): Promise<HttpResponse<T>> => {
    if (!res.ok) {
      // バリデーションエラーを422で受け取り、エラーとして投げずreturnする

      if (res.status === 422) {
        const json: {
          error: ZodError;
        } = await res.json(); // ZodErrorで一時的に型を固定

        const response: HttpResponse<T> = {
          data: null,
          error: {
            ...errors['VALIDATION'],
            errors: json.error.issues.map((issue) => ({
              code: issue.code,
              name: `${issue.path[0]}`,
              message: issue.message,
            })),
          },
          status: res.status,
        };

        console.log('=================================-');
        console.log('バリデーションエラーを受け取った！', response);
        console.log('=================================-');

        return response;
      }

      console.error('transformResponse Error:', res);

      throw res.statusText;
    }
    const json = await res.json();
    // console.log('transformResponse Success:', res, json);

    return {
      data: json,
      error: null,
      status: res.status,
    };
  };
};
