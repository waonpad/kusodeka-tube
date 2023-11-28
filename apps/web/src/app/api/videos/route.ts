import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { youtubeApi } from '@/lib/youtube-ts';
import { reqSearchParams } from '@/utils/req-search-params';

export const GetVideoByURLSchema = z.object({
  url: z.string().startsWith('https://www.youtube.com/watch?v='),
});

export async function GET(req: NextRequest) {
  const parsed = GetVideoByURLSchema.safeParse(reqSearchParams(req));

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const video = await youtubeApi.videos.get(parsed.data.url);

  return NextResponse.json(video);
}
