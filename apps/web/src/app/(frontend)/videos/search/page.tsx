import { Metadata } from 'next';
import { cFetcher } from '@/app/api/_contracts/fetcher';
import { searchVideosContract } from '@/app/api/_contracts/routes/videos/search';
import YouTubeVideoRender from '@/components/elements/youtube-video-render';
import { youtubeLink } from '@/utils/youtube-link';

export const metadata: Metadata = {
  alternates: {
    canonical: '/videos/search',
  },
  title: 'KUSODEKA VIDEO SEARCH',
  description: 'クソデカい動画を検索',
};

export default async function Page({
  searchParams,
}: {
  searchParams: { [K in keyof typeof searchVideosContract.searchParams._input]?: string };
}) {
  const res = await cFetcher(searchVideosContract)(undefined, {
    // NOTICE: このままだとパースエラーがそのまま露出するのでどうするか考える
    // パラメータがなければトップにリダイレクト？
    searchParams: searchVideosContract.searchParams.parse(searchParams),
  });

  // TODO: 次のページ(pageTokenを利用)に進むための仕組みを作る

  return (
    <div className="mx-auto max-w-5xl p-2">
      <div className="flex flex-col gap-4 md:gap-6">
        {res.data?.videos.map((video, index) => (
          <div key={video.id.videoId} className="grid grid-cols-6 gap-2 md:gap-4">
            {/* サムネと動画 */}
            <YouTubeVideoRender
              videoId={video.id.videoId}
              thumbnailProps={{ priority: index === 0 }}
              className="col-span-6 sm:col-span-2 md:col-span-3"
            />
            {/* 中身 */}
            <div className="col-span-6 sm:col-span-4 md:col-span-3">
              {/* タイトル */}
              <div className="text-lg font-bold">
                <a
                  href={youtubeLink.video(video.id.videoId)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {video.snippet.title}
                </a>
              </div>
              {/* 再生数も表示したいが検索だと取得できない */}
              {/* 投稿日時 */}
              <div className="text-sm">{video.snippet.publishedAt}</div>
              {/* チャンネルアイコンを表示したいが検索だと取得できない */}
              {/* チャンネル名 */}
              <div className="py-1 text-sm">
                <a
                  href={youtubeLink.channel(video.snippet.channelId)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {video.snippet.channelTitle}
                </a>
              </div>
              {/* 概要 */}
              <div className="text-sm">{video.snippet.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
