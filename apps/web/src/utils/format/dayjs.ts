import { extend, duration } from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';

extend(durationPlugin);

export const isoToSeconds = (iso: string): number => duration(iso).asSeconds();

export const secondsToIso = (seconds: number): string => duration(seconds, 'seconds').toISOString();

// 頭の0はなし、だが、最低でも0:01以上にはなる
export const secondsToHuman = (seconds: number): string =>
  duration(seconds, 'seconds').format(seconds >= 3600 ? 'H:mm:ss' : 'm:ss');
