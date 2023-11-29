import { YoutubeVideoSearch } from '@/lib/youtube-ts';
import { scalingNumeralsInText } from './scaling-numerals-in-text';

export const scalingVideos = <T extends Partial<YoutubeVideoSearch>>(
  videos: T,
  scale: number
): T => {
  return {
    ...videos,
    ...(videos.items &&
      videos.items.map((video) => ({
        ...video,
        snippet: {
          ...video.snippet,
          // TODO: publishedAtはISO 8601 date formatになっているので、別で処理が必要そう
          title: scalingNumeralsInText(video.snippet.title, scale),
          description: scalingNumeralsInText(video.snippet.description, scale),
          channelTitle: scalingNumeralsInText(video.snippet.channelTitle, scale),
        },
      }))),
  } satisfies typeof videos;
};
