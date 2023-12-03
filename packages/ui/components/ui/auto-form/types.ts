/* eslint-disable @typescript-eslint/no-explicit-any -- - */
import type { ControllerRenderProps, FieldValues } from 'react-hook-form';
import type * as z from 'zod';
import type { InputWithAdornmentProps } from '../input-with-adornment';
import type { SelectWithAdornmentProps } from '../select-with-adornment';
import type { INPUT_COMPONENTS } from './config';

export interface FieldConfigItem {
  description?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> & {
    showLabel?: boolean;
  };
  fieldType?: keyof typeof INPUT_COMPONENTS | React.FC<AutoFormInputComponentProps>;

  renderParent?: (props: { children: React.ReactNode }) => React.ReactElement | null;

  /**
   * 追加した by waonpad
   * とりあえず動いた
   */
  withAdornment?:
    | Omit<InputWithAdornmentProps, 'children'>
    | Omit<SelectWithAdornmentProps, 'children'>;
}

export type FieldConfig<SchemaType extends z.infer<z.ZodObject<any, any>>> = {
  // If SchemaType.key is an object, create a nested FieldConfig, otherwise FieldConfigItem
  [Key in keyof SchemaType]?: SchemaType[Key] extends object
    ? FieldConfig<z.infer<SchemaType[Key]>>
    : FieldConfigItem;
};

/**
 * A FormInput component can handle a specific Zod type (e.g. "ZodBoolean")
 */
export interface AutoFormInputComponentProps {
  zodInputProps: React.InputHTMLAttributes<HTMLInputElement>;
  field: ControllerRenderProps<FieldValues, any>;
  fieldConfigItem: FieldConfigItem;
  label: string;
  isRequired: boolean;
  fieldProps: any;
  zodItem: z.ZodAny;
}
