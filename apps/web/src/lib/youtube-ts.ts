// https://github.com/Tenpi/youtube.ts

import Youtube from 'youtube.ts';
import { serverEnv } from '@/constants';

export const youtubeApi = new Youtube(serverEnv.GCLOUD_API_KEY);
