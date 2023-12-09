'use client';

import { useState } from 'react';
import { cn } from 'ui/lib/utils';
import { secondsToHuman, isoToSeconds } from '@/utils/format/dayjs';
import { YoutubeVideoRender, YoutubeVideoRenderProps } from '..';

export type YoutubeVideoRenderWithDurationProps = React.HTMLAttributes<HTMLDivElement> & {
  duration: string;
  renderProps: YoutubeVideoRenderProps;
};

export const YoutubeVideoRenderWithDuration = ({
  duration,
  renderProps,
  ...props
}: YoutubeVideoRenderWithDurationProps) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  const handleLoadIframe = () => {
    setIsIframeLoaded(true);
  };

  return (
    <div {...props} className={cn('relative', props?.className)}>
      <YoutubeVideoRender {...renderProps} onLoadIframe={handleLoadIframe} />
      <div
        className={`absolute bottom-2 right-2 rounded-md bg-black/50 px-2 py-0.5 text-white ${
          isIframeLoaded ? 'hidden' : ''
        }`}
      >
        {secondsToHuman(isoToSeconds(duration))}
      </div>
    </div>
  );
};
