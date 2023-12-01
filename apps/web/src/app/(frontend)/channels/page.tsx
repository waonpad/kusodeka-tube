import { Metadata } from 'next';
import { cFetcher } from '@/app/api/_contracts/fetcher';
import { getChannelByURLContract } from '@/app/api/_contracts/routes/channels';

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

  return <div>/channels</div>;
}
