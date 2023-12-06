import { NextResponse } from 'next/server';
import { youtubeApi } from '@/lib/youtube-ts';
import { scalingChannel } from '@/utils/scaling-channel';
import { cHandler } from '../_contracts/handler';
import { getChannelByURLContract } from '../_contracts/routes/channels';

export const dynamic = 'force-dynamic';

export const GET = cHandler(getChannelByURLContract, async (req, { searchParams }) => {
  const channel = await youtubeApi.channels.get(searchParams!.url);

  const scaledChannel = scalingChannel(channel, searchParams!.scale);

  console.log(scaledChannel);

  return NextResponse.json({
    channel: scaledChannel,
  });
});
