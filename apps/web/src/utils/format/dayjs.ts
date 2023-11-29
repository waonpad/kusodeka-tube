import { extend, duration } from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';

extend(durationPlugin);

export const isoToSeconds = (iso: string): number => duration(iso).asSeconds();

export const secondsToIso = (seconds: number): string => duration(seconds, 'seconds').toISOString();
