import { Metadata } from 'next';
import { cFetcher } from '@/app/api/_contracts/fetcher';
import { searchVideosContract } from '@/app/api/_contracts/routes/videos/search';

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
  searchParams: { [K in keyof typeof searchVideosContract.query._input]?: string };
}) {
  const res = await cFetcher(searchVideosContract)(undefined, {
    // NOTICE: このままだとパースエラーがそのまま露出するのでどうするか考える
    // パラメータがなければトップにリダイレクト？
    query: searchVideosContract.query.parse(searchParams),
  });

  console.log('videos', res.data?.videos);

  return <div>/videos/search</div>;
}
