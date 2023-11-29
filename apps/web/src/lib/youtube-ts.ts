// https://github.com/Tenpi/youtube.ts

import Youtube, { YoutubeVideo, YoutubeVideoParams } from 'youtube.ts';
import { serverEnv } from '@/constants';

export * from 'youtube.ts';

const youtube = new Youtube(serverEnv.GCLOUD_API_KEY);

export const defaultVideoPart = ['kind', 'etag', 'id'] satisfies (keyof YoutubeVideo)[];
export type DefaultVideoPart = (typeof defaultVideoPart)[number];

export type AdditionalVideoPart = keyof Omit<YoutubeVideo, DefaultVideoPart>;

/**
 * @description
 * 可能な範囲で型安全にして使いやすくするためにyoutube.tsを拡張している
 * 必要なものだけ随時拡張する
 */
export const youtubeApi = {
  ...youtube,
  videos: {
    ...youtube.videos,
    /**
     * @description
     * 本来partは文字列で受け取るが、型のついた配列で受け取るようにしている
     * @todo
     * 引数の型によって返り値の型を変えたい
     */
    get: (
      videoResolvable: string,
      params?:
        | (Omit<YoutubeVideoParams, 'part'> & {
            part?: AdditionalVideoPart[];
          })
        | undefined
    ): Promise<YoutubeVideo> => {
      return youtube.videos.get(videoResolvable, {
        ...params,
        part: params?.part ? params.part.join(',') : undefined,
      });
    },
  },
};
