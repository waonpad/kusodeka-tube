import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { youtubeApi } from '@/lib/youtube-ts';
import { reqSearchParams } from '@/utils/req-search-params';

export const GetChannelByURLSchema = z.object({
  url: z.string().startsWith('https://www.youtube.com/'),
});

export async function GET(req: NextRequest) {
  const parsed = GetChannelByURLSchema.safeParse(reqSearchParams(req));

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const channel = await youtubeApi.channels.get(parsed.data.url);

  return NextResponse.json(channel);
}
