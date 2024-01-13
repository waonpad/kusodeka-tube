import { Metadata } from 'next';
import { clientEnv } from '@/constants';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Page() {
  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center gap-12 text-center">
      <div>
        <p className="text-2xl lg:text-3xl">▶ クソデカいYouTube、KUSODEKA TUBE</p>
        <br />
        <p className="text-xl lg:text-2xl">さあ、クソデカくしよう。</p>
      </div>
      <div>
        <a href={clientEnv.NEXT_PUBLIC_GITHUB_URL} target="_blank" rel="noopener noreferrer">
          <span className="i-mdi-github h-12 w-12" />
        </a>
      </div>
    </div>
  );
}
