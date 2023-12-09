import { Metadata } from 'next';
import { cFetcher } from '@/app/api/_contracts/fetcher';
import { getVideoByURLContract } from '@/app/api/_contracts/routes/videos';
import { YoutubeVideoRenderWithDuration } from '@/components/elements/youtube-video-render/with-duration';
import { Linkify } from '@/lib/linkify';
import { youtubeLink } from '@/utils/youtube-link';
import { VideoStats } from './(components)/video-stats';

export const metadata: Metadata = {
  alternates: {
    canonical: '/videos',
  },
  title: 'KUSODEKA VIDEO',
  description: 'クソデカい動画',
};

export default async function Page({
  searchParams,
}: {
  searchParams: { [K in keyof typeof getVideoByURLContract.searchParams._input]?: string };
}) {
  const res = await cFetcher(getVideoByURLContract)(undefined, {
    // NOTICE: このままだとパースエラーがそのまま露出するのでどうするか考える
    // パラメータがなければトップにリダイレクト？
    searchParams: getVideoByURLContract.searchParams.parse(searchParams),
  });

  console.log('video', res.data?.video);

  if (!res.data?.video) {
    return <div>Not Found</div>;
  }

  const video = res.data?.video;

  return (
    <div className="mx-auto max-w-5xl p-2">
      <div className="grid grid-cols-6 gap-2 md:gap-4">
        <div className="col-span-6 space-y-2 md:col-span-4">
          {/* サムネと動画 */}
          <YoutubeVideoRenderWithDuration
            duration={video.contentDetails.duration}
            renderProps={{
              videoId: video.id,
              thumbnailProps: { priority: true },
            }}
          />
          {/* 中身 */}
          <div className="space-y-2">
            {/* タイトル */}
            <div className="space-y-1">
              <div className="text-lg font-bold">
                <a href={youtubeLink.video(video.id)} target="_blank" rel="noopener noreferrer">
                  {video.snippet.title}
                </a>
              </div>
              {/* チャンネルアイコンを表示したいが動画検索だと取得できない */}
              {/* チャンネル名 */}
              <div className="text-base">
                <a
                  href={youtubeLink.channel(video.snippet.channelId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center space-x-1"
                >
                  <span className="i-mdi-account-circle-outline h-4 w-4" />
                  <span>{video.snippet.channelTitle}</span>
                </a>
              </div>
            </div>
            {/* 詳細データ */}
            <VideoStats video={video} className="border-t border-gray-400 pt-2 md:hidden" />
            {/* 概要 */}
            <Linkify
              className="whitespace-pre-line border-t border-gray-400 pt-2 text-sm"
              as="div"
              options={{
                attributes: {
                  className: 'text-blue-500',
                  target: '_blank',
                  rel: 'noopener noreferrer',
                },
              }}
            >
              {video.snippet.description}
            </Linkify>
          </div>
        </div>
        {/* 右エリア 詳細データ */}
        <VideoStats video={video} className="col-span-2 hidden md:flex" />
      </div>
    </div>
  );
}
