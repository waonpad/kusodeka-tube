import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { youtubeApi } from '@/lib/youtube-ts';
import { reqSearchParams } from '@/utils/req-search-params';
import { scalingVideos } from '@/utils/scaling-videos';

/**
 * @see https://github.com/Tenpi/youtube.ts/blob/master/types/SearchTypes.ts#L3
 * @description
 * This schema ensures only the necessary elements from the above link types \
 * If you edit this schema, please make sure to meet the above link types
 */
export const SearchVideoSchema = z.object({
  q: z.string().optional(),
  maxResults: z.number().max(50).default(10),
  pageToken: z.string().optional(),
});

const scale: number = 50;

export async function GET(req: NextRequest) {
  const parsed = SearchVideoSchema.safeParse(reqSearchParams(req));

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const videos = await youtubeApi.videos.search(parsed.data);

  const scaledVideos = scalingVideos(videos, scale);

  console.log(scaledVideos);

  return NextResponse.json(scaledVideos);
}
