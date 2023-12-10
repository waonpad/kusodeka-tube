import { Metadata } from 'next';
import Image from 'next/image';
import { cFetcher } from '@/app/api/_contracts/fetcher';
import { getChannelByURLContract } from '@/app/api/_contracts/routes/channels';
import { Linkify } from '@/lib/linkify';
import { formatScaledDateTime } from '@/utils/format/dayjs';
import { youtubeLink } from '@/utils/youtube-link';

export const metadata: Metadata = {
  alternates: {
    canonical: '/channels',
  },
  title: 'KUSODEKA CHANNEL',
  description: 'クソデカいチャンネル',
};

export default async function Page({
  searchParams,
}: {
  searchParams: { [K in keyof typeof getChannelByURLContract.searchParams._input]?: string };
}) {
  const res = await cFetcher(getChannelByURLContract)(undefined, {
    // NOTICE: このままだとパースエラーがそのまま露出するのでどうするか考える
    // パラメータがなければトップにリダイレクト？
    searchParams: getChannelByURLContract.searchParams.parse(searchParams),
  });

  console.log('channel', res.data?.channel);

  /**
   * チャンネルが見つからなかったら500エラーでエラー画面に遷移する
   */
  const channel = res.data!.channel!;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-2 p-2">
      {/* バナー */}
      {!!channel.brandingSettings?.image?.bannerExternalUrl && (
        <div className="relative aspect-[6.25/1] w-full">
          <Image
            src={channel.brandingSettings.image.bannerExternalUrl}
            fill
            sizes="100vw"
            alt={channel.snippet.title}
            priority
            className="rounded-xl object-cover"
          />
        </div>
      )}
      <div className="flex flex-col gap-2 md:flex-row md:gap-4">
        <div className="col-span-6 gap-2 md:col-span-2">
          <a href={youtubeLink.channel(channel.id)} target="_blank" rel="noopener noreferrer">
            {/* アイコン */}
            <div className="relative mx-auto aspect-square w-36 md:w-48">
              <Image
                src={channel.snippet.thumbnails.high.url}
                fill
                sizes="50vw"
                alt={channel.snippet.title}
                priority
                className="rounded-full object-cover"
              />
            </div>
          </a>
        </div>
        <div className="col-span-6 flex flex-col gap-2 md:col-span-4">
          {/* 名前 */}
          <div className="flex items-center gap-1 text-3xl font-bold">
            <a href={youtubeLink.channel(channel.id)} target="_blank" rel="noopener noreferrer">
              <span>{channel.snippet.title}</span>
            </a>
          </div>
          {/* 登録者数 */}
          <div className="flex items-center gap-1 text-sm">
            <span className="i-mdi-account-group-outline h-4 w-4 shrink-0" />
            <div className="flex items-end gap-1">
              <span>{Number(channel.statistics.subscriberCount).toLocaleString()}</span>
              <span className="text-xs">subscribers</span>
            </div>
          </div>
          {/* 動画数 */}
          <div className="flex items-center gap-1 text-sm">
            <span className="i-mdi-video-outline h-4 w-4 shrink-0" />
            <div className="flex items-end gap-1">
              <span>{Number(channel.statistics.videoCount).toLocaleString()}</span>
              <span className="text-xs">videos</span>
            </div>
          </div>
          {/* 総再生数 */}
          <div className="flex items-center gap-1 text-sm">
            <span className="i-mdi-play-circle-outline h-4 w-4 shrink-0" />
            <div className="flex items-end gap-1">
              <span>{Number(channel.statistics.viewCount).toLocaleString()}</span>
              <span className="text-xs">views</span>
            </div>
          </div>
          {/* 登録日 */}
          <div className="flex items-center gap-1 text-sm">
            <span className="i-mdi-calendar-check h-4 w-4 shrink-0" />
            <div className="flex items-end gap-1">
              <span>{formatScaledDateTime(channel.snippet.publishedAt)}</span>
              <span className="text-xs">joined</span>
            </div>
          </div>
          {/* キーワード */}
          {/* keywordsは空白で区切られている */}
          <div className="flex items-start gap-1 text-sm">
            <span className="i-mdi-bookmark-outline mt-[0.1rem] h-4 w-4 shrink-0" />
            <div className="flex flex-wrap gap-1">
              {channel.brandingSettings.channel.keywords?.split(' ').map((keyword, index) => (
                <div key={index} className="rounded-sm bg-gray-100 px-2 py-0.5">
                  {keyword}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {/* 概要 */}
        <Linkify
          className="col-span-6 whitespace-pre-line border-t border-gray-400 pt-2 text-sm"
          as="div"
          options={{
            attributes: {
              className: 'text-blue-500',
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          }}
        >
          {channel.snippet.description}
        </Linkify>
      </div>
    </div>
  );
}
