import { YoutubeChannel } from '@/lib/youtube-ts';
import { scalingNumeralsInText } from './scaling-numerals-in-text';

export const scalingChannel = <T extends Partial<YoutubeChannel>>(channel: T, scale: number): T => {
  return {
    ...channel,
    ...(channel.snippet && {
      snippet: {
        ...channel.snippet,
        // TODO: publishedAtはISO 8601 date formatになっているので、別で処理が必要そう
        publishedAt: scalingNumeralsInText(channel.snippet.publishedAt, scale),
        title: scalingNumeralsInText(channel.snippet.title, scale),
        description: scalingNumeralsInText(channel.snippet.description, scale),
      },
    }),
    ...(channel.statistics && {
      statistics: {
        ...channel.statistics,
        viewCount: scalingNumeralsInText(channel.statistics.viewCount, scale),
        subscriberCount: scalingNumeralsInText(channel.statistics.subscriberCount, scale),
        videoCount: scalingNumeralsInText(channel.statistics.videoCount, scale),
      },
    }),
    ...(channel.brandingSettings && {
      brandingSettings: {
        ...channel.brandingSettings,
        channel: {
          ...channel.brandingSettings.channel,
          keywords: scalingNumeralsInText(channel.brandingSettings.channel.keywords, scale),
        },
      },
    }),
  } satisfies typeof channel;
};
