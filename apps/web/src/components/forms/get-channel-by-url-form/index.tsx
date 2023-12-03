import { AutoForm } from 'ui/components/ui/auto-form';
import { z } from 'zod';
import { SubmitHeaderSearchIconButton } from '@/components/elements/button/submit-header-search-button';
import { getChannelByURLFormSchema } from './schema';

export type GetChannelByURLFormProps = {
  handleSubmit: (values: z.infer<typeof getChannelByURLFormSchema>) => void;
};

export const GetChannelByURLForm = ({ handleSubmit }: GetChannelByURLFormProps) => {
  return (
    <AutoForm
      className="w-full [&>div]:flex [&>div]:flex-wrap [&>div]:space-y-0 md:[&>div]:flex-nowrap md:[&>div]:space-x-2"
      formSchema={getChannelByURLFormSchema}
      values={{ scale: 100 }}
      onSubmit={handleSubmit}
      fieldConfig={{
        url: {
          renderParent({ children }) {
            return (
              <div className="mb-2 w-[calc(100vw_-_16px)] grow md:mb-0 md:w-auto">{children}</div>
            );
          },
          inputProps: {
            showLabel: false,
            placeholder: `${getChannelByURLFormSchema.shape.url._def.description} *`,
          },
        },
        scale: {
          withAdornment: { adornment: '倍', adornmentPosition: 'end' },
          renderParent({ children }) {
            return (
              <>
                <div className="w-32 grow sm:w-48 md:grow-0 [&>div]:space-y-0">{children}</div>

                {/* レイアウトの都合上、ボタンをこの中に入れる */}
                <SubmitHeaderSearchIconButton className="ml-2" />
              </>
            );
          },
          inputProps: { showLabel: false },
        },
      }}
    />
  );
};
