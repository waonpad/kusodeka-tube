/* eslint-disable import/no-default-export -- - */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- - */
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '../../form';
import type { InputProps } from '../../input';
import { Input } from '../../input';
import { InputWithAdornment } from '../../input-with-adornment';
import type { AutoFormInputComponentProps } from '../types';

export default function AutoFormInput({
  label,
  isRequired,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps): JSX.Element {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;
  const showLabel = _showLabel === undefined ? true : _showLabel;
  return (
    <FormItem>
      {showLabel ? (
        <FormLabel>
          {label}
          {isRequired ? <span className="text-destructive"> *</span> : null}
        </FormLabel>
      ) : null}
      <FormControl>
        {fieldConfigItem.withAdornment !== undefined ? (
          <InputWithAdornment
            {...fieldConfigItem.withAdornment}
            inputProps={{ type: 'text', ...fieldPropsWithoutShowLabel } as InputProps}
          />
        ) : (
          <Input type="text" {...fieldPropsWithoutShowLabel} />
        )}
      </FormControl>
      {fieldConfigItem.description ? (
        <FormDescription>{fieldConfigItem.description}</FormDescription>
      ) : null}
      <FormMessage />
    </FormItem>
  );
}
