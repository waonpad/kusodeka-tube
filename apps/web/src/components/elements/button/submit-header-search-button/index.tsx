import { ButtonProps, Button } from 'ui/components/ui/button';

export type SubmitHeaderSearchIconButtonProps = ButtonProps;

export const SubmitHeaderSearchIconButton = (props: SubmitHeaderSearchIconButtonProps) => {
  return (
    <Button type="submit" variant="outline" size="icon" {...props}>
      <span
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className="i-mdi-magnify h-8 w-8"
      />
    </Button>
  );
};
