/* eslint-disable import/no-default-export -- - */
/* eslint-disable @typescript-eslint/no-unsafe-argument -- - */
/* eslint-disable @typescript-eslint/no-unsafe-assignment -- - */
/* eslint-disable @typescript-eslint/no-explicit-any -- - */
import type * as z from 'zod';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '../../form';
import { Select, SelectContent, SelectItem, SelectValue } from '../../select';
import type { AutoFormInputComponentProps } from '../types';
import { getBaseSchema } from '../utils';
import { SelectWithAdornment } from '../../select-with-adornment';

export default function AutoFormEnum({
  label,
  isRequired,
  field,
  fieldConfigItem,
  zodItem,
}: AutoFormInputComponentProps): JSX.Element {
  const baseValues = (getBaseSchema(zodItem) as unknown as z.ZodEnum<any>)._def.values;

  let values: [string, string][] = [];
  if (!Array.isArray(baseValues)) {
    values = Object.entries(baseValues);
  } else {
    values = baseValues.map((value) => [value, value]);
  }

  function findItem(value: any): [string, string] | undefined {
    return values.find((item) => item[0] === value);
  }

  return (
    <FormItem>
      <FormLabel>
        {label}
        {isRequired ? <span className="text-destructive"> *</span> : null}
      </FormLabel>
      <FormControl>
        <Select defaultValue={field.value} onValueChange={field.onChange}>
          {fieldConfigItem.withAdornment !== undefined ? (
            <SelectWithAdornment {...fieldConfigItem.withAdornment}>
              <SelectValue className="w-full" placeholder={fieldConfigItem.inputProps?.placeholder}>
                {field.value ? findItem(field.value)?.[1] : 'Select an option'}
              </SelectValue>
            </SelectWithAdornment>
          ) : (
            <SelectValue className="w-full" placeholder={fieldConfigItem.inputProps?.placeholder}>
              {field.value ? findItem(field.value)?.[1] : 'Select an option'}
            </SelectValue>
          )}
          <SelectContent>
            {values.map(([value, valueLabel]) => (
              <SelectItem key={value} value={valueLabel}>
                {valueLabel}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      {fieldConfigItem.description ? (
        <FormDescription>{fieldConfigItem.description}</FormDescription>
      ) : null}
      <FormMessage />
    </FormItem>
  );
}
