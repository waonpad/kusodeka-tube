import { YoutubeVideo } from '@/lib/youtube-ts';
import { isoToSeconds, secondsToIso } from './format/dayjs';
import { scalingNumeralsInText } from './scaling-numerals-in-text';

export const scalingVideo = <T extends Partial<YoutubeVideo>>(video: T, scale: number): T => {
  return {
    ...video,
    ...(video.snippet && {
      snippet: {
        ...video.snippet,
        publishedAt: scalingNumeralsInText(video.snippet.publishedAt, scale),
        title: scalingNumeralsInText(video.snippet.title, scale),
        description: scalingNumeralsInText(video.snippet.description, scale),
        channelTitle: scalingNumeralsInText(video.snippet.channelTitle, scale),
      },
    }),
    ...(video.contentDetails && {
      contentDetails: {
        ...video.contentDetails,
        duration: secondsToIso(isoToSeconds(video.contentDetails.duration) * scale),
      },
    }),
    ...(video.statistics && {
      statistics: {
        ...video.statistics,
        viewCount: scalingNumeralsInText(video.statistics.viewCount, scale),
        likeCount: scalingNumeralsInText(video.statistics.likeCount, scale),
        favoriteCount: scalingNumeralsInText(video.statistics.favoriteCount, scale),
        commentCount: scalingNumeralsInText(video.statistics.commentCount, scale),
      },
    }),
  } satisfies typeof video;
};
