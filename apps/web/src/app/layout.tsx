import '@/styles/globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { clientEnv } from '@/constants';
import AppProvider from '@/providers/app';

const intr = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: clientEnv.NEXT_PUBLIC_APP_NAME,
    template: `%s | ${clientEnv.NEXT_PUBLIC_APP_NAME}`,
  },
  description: 'クソデカいYouTube',
  // https://zenn.dev/temasaguru/articles/641a10cd5af02a
  metadataBase: new URL(clientEnv.NEXT_PUBLIC_HOST_URL),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={`${intr.className} flex min-h-screen flex-col`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
