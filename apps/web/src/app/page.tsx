import { clientEnv } from '@/constants';

export const metadata = {
  metadataBase: new URL(clientEnv.NEXT_PUBLIC_HOST_URL),
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return <div>Hello World!</div>;
}
