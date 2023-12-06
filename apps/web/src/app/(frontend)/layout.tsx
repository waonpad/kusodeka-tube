'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { stringify } from 'qs';
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from 'ui/components/ui/select';
import { z } from 'zod';
import { GetChannelByURLForm } from '@/components/forms/get-channel-by-url-form';
import { getChannelByURLFormSchema } from '@/components/forms/get-channel-by-url-form/schema';
import { GetVideoByURLForm } from '@/components/forms/get-video-by-url-form';
import { getVideoByURLFormSchema } from '@/components/forms/get-video-by-url-form/schema';
import { SearchVideosForm } from '@/components/forms/search-videos-form';
import { searchVideosFormSchema } from '@/components/forms/search-videos-form/schema';
import { clientEnv } from '@/constants';

const headerSearchForms = {
  forms: [
    { value: 'searchVideos', label: '動画検索' },
    { value: 'getVideoByURL', label: '動画URL' },
    { value: 'getChannelByURL', label: 'チャンネルURL' },
  ],
  default: { value: 'searchVideos', label: '動画検索' },
} as const;

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [displayForm, setDisplayForm] = useState<(typeof headerSearchForms.forms)[number]>(
    headerSearchForms.default
  );

  const handleChangeDisplayForm = (label: (typeof headerSearchForms.forms)[number]['label']) => {
    setDisplayForm(headerSearchForms.forms.find((item) => item.label === label)!);
  };

  const handleSubmitGetChannelByURL = (values: z.infer<typeof getChannelByURLFormSchema>) => {
    console.log(values);

    router.push(`/channels?${stringify(values)}`);
  };

  const handleSubmitGetVideoByURL = (values: z.infer<typeof getVideoByURLFormSchema>) => {
    console.log(values);

    router.push(`/videos?${stringify(values)}`);
  };

  const handleSubmitSearchVideos = (values: z.infer<typeof searchVideosFormSchema>) => {
    console.log(values);

    router.push(`/videos/search?${stringify(values)}`);
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 p-2 md:flex-nowrap">
        <div className="flex grow items-center gap-3">
          <div className="flex w-fit items-center">
            <span className="whitespace-nowrap text-2xl lg:text-3xl">
              {clientEnv.NEXT_PUBLIC_APP_NAME}
            </span>
          </div>

          <Select
            defaultValue={headerSearchForms.default.label}
            onValueChange={handleChangeDisplayForm}
          >
            <SelectTrigger className="md:w-64">
              <SelectValue className="w-full" placeholder={headerSearchForms.default.label}>
                {displayForm.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {headerSearchForms.forms.map(({ value, label }) => (
                <SelectItem key={value} value={label}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {displayForm.value === 'getChannelByURL' && (
          <GetChannelByURLForm handleSubmit={handleSubmitGetChannelByURL} />
        )}

        {displayForm.value === 'getVideoByURL' && (
          <GetVideoByURLForm handleSubmit={handleSubmitGetVideoByURL} />
        )}

        {displayForm.value === 'searchVideos' && (
          <SearchVideosForm handleSubmit={handleSubmitSearchVideos} />
        )}
      </div>

      {children}
    </>
  );
}
