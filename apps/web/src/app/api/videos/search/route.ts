import { NextResponse } from 'next/server';
import { youtubeApi } from '@/lib/youtube-ts';
import { scalingVideos } from '@/utils/scaling-videos';
import { cHandler } from '../../_contracts/handler';
import { searchVideosContract } from '../../_contracts/routes/videos/search';

export const GET = cHandler(searchVideosContract, async (req, { searchParams }) => {
  const videos = await youtubeApi.videos.search(searchParams!);

  const scaledVideos = scalingVideos(videos, searchParams!.scale);

  console.log(scaledVideos);

  const { items, ...meta } = scaledVideos;

  return NextResponse.json({
    meta,
    videos: items,
  });
});
