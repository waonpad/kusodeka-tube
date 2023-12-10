import { extend, duration } from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';

extend(durationPlugin);

export const isoToSeconds = (iso: string): number => duration(iso).asSeconds();

export const secondsToIso = (seconds: number): string => duration(seconds, 'seconds').toISOString();

// 頭の0はなし、だが、最低でも0:01以上にはなる
export const secondsToHuman = (seconds: number): string =>
  duration(seconds, 'seconds').format(seconds >= 3600 ? 'H:mm:ss' : 'm:ss');

// 202300-800-1300T1100:0:1600Z のような形式を無理やりやる
// Zは無視する
// -201100-800-1000T1700:1500:100Z
// このような場合もある
// こうなる
// -201100/800/1000 1700:1500:100
export const formatScaledDateTime = (scaledDateTime: string): string => {
  const isMinus = scaledDateTime.startsWith('-');
  // isMinusがtrueなら、-を消す
  const normalized = !isMinus ? scaledDateTime : scaledDateTime.slice(1);

  const [date, time] = normalized.split('T');
  const [year, month, day] = date.split('-');
  const [hour, minute, second] = time.split(':');
  return `${isMinus ? '-' : ''}${year}/${month}/${day} ${hour}:${minute}:${second.split('Z')[0]}`;
};
