import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { AdditionalVideoPart, DefaultVideoPart, YoutubeVideo, youtubeApi } from '@/lib/youtube-ts';
import { reqSearchParams } from '@/utils/req-search-params';
import { scalingVideo } from '@/utils/scaling-video';

export const GetVideoByURLSchema = z.object({
  url: z.string().startsWith('https://www.youtube.com/watch?v='),
});

const additionalVideoPart = [
  'snippet',
  'contentDetails',
  'statistics',
] satisfies AdditionalVideoPart[];

const scale: number = 50;

export async function GET(req: NextRequest) {
  const parsed = GetVideoByURLSchema.safeParse(reqSearchParams(req));

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const video: Pick<YoutubeVideo, DefaultVideoPart | (typeof additionalVideoPart)[number]> =
    await youtubeApi.videos.get(parsed.data.url, {
      part: additionalVideoPart,
    });

  const scaledVideo = scalingVideo(video, scale);

  console.log(scaledVideo);

  return NextResponse.json(scaledVideo);
}
