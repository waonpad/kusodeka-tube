import { cn } from 'ui/lib/utils';
import { getVideoByURLContract } from '@/app/api/_contracts/routes/videos';
import { formatScaledDateTime } from '@/utils/format/dayjs';

export type VideoStats = React.HTMLAttributes<HTMLDivElement> & {
  video: (typeof getVideoByURLContract.response._output)['video'];
};

export const VideoStats = ({ video, ...props }: VideoStats) => {
  return (
    <div {...props} className={cn('flex flex-col gap-2', props.className)}>
      {/* 投稿日時 */}
      <div className="flex items-center gap-1 text-sm">
        <span className="i-mdi-calendar-check h-4 w-4 shrink-0" />
        <span>{formatScaledDateTime(video.snippet.publishedAt)}</span>
      </div>
      {/* 再生数 */}
      <div className="flex items-center gap-1 text-sm">
        <span className="i-mdi-play-circle-outline h-4 w-4 shrink-0" />
        <div className="flex items-end gap-1">
          <span>{Number(video.statistics.viewCount).toLocaleString()}</span>
          <span className="text-xs">views</span>
        </div>
      </div>
      {/* 高評価数 */}
      <div className="flex items-center gap-1 text-sm">
        <span className="i-mdi-thumb-up-outline h-4 w-4 shrink-0" />
        <div className="flex items-end gap-1">
          <span>{Number(video.statistics.likeCount).toLocaleString()}</span>
          <span className="text-xs">likes</span>
        </div>
      </div>
      {/* コメント数 */}
      <div className="flex items-center gap-1 text-sm">
        <span className="i-mdi-comment-outline h-4 w-4 shrink-0" />
        <div className="flex items-end gap-1">
          <span>{Number(video.statistics.commentCount).toLocaleString()}</span>
          <span className="text-xs">comments</span>
        </div>
      </div>
      {/* タグ */}
      {/* TODO: タグの文字列で検索するリンクにしたら面白い？ */}
      <div className="flex items-start gap-1 text-sm">
        <span className="i-mdi-bookmark-outline mt-[0.1rem] h-4 w-4 shrink-0" />
        <div className="flex flex-wrap gap-1">
          {video.snippet.tags?.map((tag, index) => (
            <div key={index} className="rounded-sm bg-gray-100 px-2 py-0.5">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
