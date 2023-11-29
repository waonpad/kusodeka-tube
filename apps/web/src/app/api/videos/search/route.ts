import { NextResponse } from 'next/server';
import { youtubeApi } from '@/lib/youtube-ts';
import { scalingVideos } from '@/utils/scaling-videos';
import { cHandler } from '../../_contracts/handler';
import { searchVideosContract } from '../../_contracts/routes/videos/search';

export const GET = cHandler(searchVideosContract, async (req, { query }) => {
  const videos = await youtubeApi.videos.search(query!);

  const scaledVideos = scalingVideos(videos, query!.scale);

  console.log(scaledVideos);

  return NextResponse.json({
    videos: scaledVideos,
  });
});
