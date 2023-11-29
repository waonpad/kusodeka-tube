import { NextResponse } from 'next/server';
import { youtubeApi } from '@/lib/youtube-ts';
import { scalingChannel } from '@/utils/scaling-channel';
import { cHandler } from '../_contracts/handler';
import { getChannelByURLContract } from '../_contracts/routes/channels';

export const GET = cHandler(getChannelByURLContract, async (req, { query }) => {
  const channel = await youtubeApi.channels.get(query!.url);

  const scaledChannel = scalingChannel(channel, query!.scale);

  console.log(scaledChannel);

  return NextResponse.json({
    channel: scaledChannel,
  });
});
