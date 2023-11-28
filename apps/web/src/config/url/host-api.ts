import { clientEnv } from '@/constants';

export const hostApi = (path: string) => {
  return `${clientEnv.NEXT_PUBLIC_HOST_URL}/api/${path}`;
};
