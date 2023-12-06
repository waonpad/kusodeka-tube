import { NextResponse } from 'next/server';
import { DefaultVideoPart, YoutubeVideo, youtubeApi } from '@/lib/youtube-ts';
import { scalingVideo } from '@/utils/scaling-video';
import { cHandler } from '../_contracts/handler';
import { additionalVideoPart, getVideoByURLContract } from '../_contracts/routes/videos';

export const dynamic = 'force-dynamic';

export const GET = cHandler(getVideoByURLContract, async (req, { searchParams }) => {
  const video: Pick<YoutubeVideo, DefaultVideoPart | (typeof additionalVideoPart)[number]> =
    await youtubeApi.videos.get(searchParams!.url, {
      part: additionalVideoPart,
    });

  const scaledVideo = scalingVideo(video, searchParams!.scale);

  console.log(scaledVideo);

  return NextResponse.json({
    video: scaledVideo,
  });
});
