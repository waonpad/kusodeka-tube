import { Metadata } from 'next';
import { cFetcher } from '@/app/api/_contracts/fetcher';
import { getVideoByURLContract } from '@/app/api/_contracts/routes/videos';

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
  searchParams: { [K in keyof typeof getVideoByURLContract.query._input]?: string };
}) {
  const res = await cFetcher(getVideoByURLContract)(undefined, {
    // NOTICE: このままだとパースエラーがそのまま露出するのでどうするか考える
    // パラメータがなければトップにリダイレクト？
    query: getVideoByURLContract.query.parse(searchParams),
  });

  console.log('video', res.data?.video);

  return <div>/videos</div>;
}
