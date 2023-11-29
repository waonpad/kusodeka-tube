import { NextResponse } from 'next/server';
import { DefaultVideoPart, YoutubeVideo, youtubeApi } from '@/lib/youtube-ts';
import { scalingVideo } from '@/utils/scaling-video';
import { cHandler } from '../_contracts/handler';
import { additionalVideoPart, getVideoByURLContract } from '../_contracts/routes/videos';

export const GET = cHandler(getVideoByURLContract, async (req, { query }) => {
  const video: Pick<YoutubeVideo, DefaultVideoPart | (typeof additionalVideoPart)[number]> =
    await youtubeApi.videos.get(query!.url, {
      part: additionalVideoPart,
    });

  const scaledVideo = scalingVideo(video, query!.scale);

  console.log(scaledVideo);

  return NextResponse.json({
    video: scaledVideo,
  });
});
