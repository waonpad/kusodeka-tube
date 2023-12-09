'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from 'ui/lib/utils';
import { youtubeLink } from '@/utils/youtube-link';
import { youtubeVideoThumbnailLink } from '@/utils/youtube-video-thumbnail-link';

export type YoutubeVideoRenderProps = React.HTMLAttributes<HTMLDivElement> & {
  videoId: string;
  thumbnailProps?: typeof Image.defaultProps;
  iframeProps?: React.IframeHTMLAttributes<HTMLIFrameElement>;
  onClickThumbnail?: () => void;
  onLoadIframe?: () => void;
};

export const YoutubeVideoRender = ({
  videoId,
  thumbnailProps,
  iframeProps,
  onClickThumbnail,
  onLoadIframe,
  ...props
}: YoutubeVideoRenderProps) => {
  const [showIframe, setShowIframe] = useState(false);

  const [canLoadIframe, setCanLoadIframe] = useState(false);

  const handleClickThumbnail = () => {
    setCanLoadIframe(true);

    onClickThumbnail && onClickThumbnail();
    // TODO: ロード中を示すUIが欲しい
  };

  const handleLoadIframe = () => {
    setShowIframe(true);

    onLoadIframe && onLoadIframe();
  };

  return (
    <div {...props} className={cn('relative aspect-video w-full', props?.className)}>
      {!showIframe && (
        <>
          <Image
            sizes="50vw"
            priority={false}
            alt="" // TODO: 設定する
            {...thumbnailProps}
            // standardで全ての動画のサムネを取得できるか未検証
            src={youtubeVideoThumbnailLink.standard(videoId)}
            fill
            className={cn('object-cover rounded-xl', thumbnailProps?.className)}
          />
          <div
            className="absolute left-0 top-0 h-full w-full cursor-pointer rounded-xl bg-black/0 hover:bg-black/10"
            onClick={handleClickThumbnail}
          />
        </>
      )}
      {canLoadIframe && (
        <iframe
          className={cn(
            'h-full w-full rounded-xl',
            showIframe ? 'visible' : 'invisible',
            iframeProps?.className
          )}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          {...iframeProps}
          src={youtubeLink.embed(videoId)}
          onLoad={handleLoadIframe}
        />
      )}
    </div>
  );
};
