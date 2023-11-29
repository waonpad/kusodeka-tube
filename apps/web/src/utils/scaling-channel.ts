import { YoutubeChannel } from '@/lib/youtube-ts';
import { scalingNumeralsInText } from './scaling-numerals-in-text';

export const scalingChannel = <T extends Partial<YoutubeChannel>>(channel: T, scale: number): T => {
  return {
    ...channel,
    ...(channel.snippet && {
      ...channel.snippet,
      // TODO: publishedAtはISO 8601 date formatになっているので、別で処理が必要そう
      title: scalingNumeralsInText(channel.snippet.title, scale),
      description: scalingNumeralsInText(channel.snippet.description, scale),
    }),
    ...(channel.statistics && {
      ...channel.statistics,
      viewCount: scalingNumeralsInText(channel.statistics.viewCount, scale),
      subscriberCount: scalingNumeralsInText(channel.statistics.subscriberCount, scale),
      videoCount: scalingNumeralsInText(channel.statistics.videoCount, scale),
    }),
    ...(channel.brandingSettings && {
      ...channel.brandingSettings,
      channel: {
        ...channel.brandingSettings.channel,
        keywords: scalingNumeralsInText(channel.brandingSettings.channel.keywords, scale),
      },
    }),
  } satisfies typeof channel;
};
