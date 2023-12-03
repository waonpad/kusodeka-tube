import { AutoForm } from 'ui/components/ui/auto-form';
import { z } from 'zod';
import { SubmitHeaderSearchIconButton } from '@/components/elements/button/submit-header-search-button';
import { searchVideosFormSchema } from './schema';

export type searchVideosFormProps = {
  handleSubmit: (values: z.infer<typeof searchVideosFormSchema>) => void;
};

export const SearchVideosForm = ({ handleSubmit }: searchVideosFormProps) => {
  return (
    <AutoForm
      className="w-full [&>div]:flex [&>div]:flex-wrap [&>div]:space-y-0 md:[&>div]:flex-nowrap md:[&>div]:space-x-2"
      formSchema={searchVideosFormSchema}
      values={{ scale: 100, maxResults: '10' }}
      onSubmit={handleSubmit}
      fieldConfig={{
        q: {
          renderParent({ children }) {
            return (
              <div className="mb-2 w-[calc(100vw_-_16px)] grow md:mb-0 md:w-auto">{children}</div>
            );
          },
          inputProps: {
            showLabel: false,
            placeholder: `${searchVideosFormSchema.shape.q._def.description} *`,
          },
        },
        scale: {
          withAdornment: { adornment: '倍', adornmentPosition: 'end' },
          renderParent({ children }) {
            return <div className="w-32 grow sm:w-48 md:grow-0 [&>div]:space-y-0">{children}</div>;
          },
          inputProps: { showLabel: false },
        },
        maxResults: {
          withAdornment: { adornment: '件', adornmentPosition: 'end' },
          renderParent({ children }) {
            return (
              <>
                {/* inputPropsでラベルを消すのがなぜか効かないので、ここで消す */}
                <div className="ml-2 w-20 grow sm:w-28 md:ml-0 md:grow-0 [&>div>label]:hidden [&>div]:space-y-0">
                  {children}
                </div>

                {/* レイアウトの都合上、ボタンをこの中に入れる */}
                <SubmitHeaderSearchIconButton className="ml-2" />
              </>
            );
          },
          inputProps: { placeholder: '10' },
        },
      }}
    />
  );
};
