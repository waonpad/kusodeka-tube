import type { HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';
import type * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from 'ui/lib/utils';
import { SelectTrigger } from './select';

export interface SelectWithAdornmentProps extends HTMLAttributes<HTMLDivElement> {
  adornment: React.ReactNode;
  adornmentPosition?: 'start' | 'end';
  adornmentProps?: HTMLAttributes<HTMLDivElement>;
  selectTriggerProps?: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>;
}

const adornmentCommonClassName = 'flex items-center p-2 text-sm h-10 border-input';

const SelectWithAdornment = forwardRef<HTMLDivElement, SelectWithAdornmentProps>(
  (
    {
      className,
      adornment,
      adornmentPosition = 'start',
      adornmentProps,
      selectTriggerProps,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          'flex rounded-md h-10 border border-input bg-background ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled-within:cursor-not-allowed disabled-within:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      >
        {adornmentPosition === 'start' && (
          <div
            {...adornmentProps}
            className={cn(
              adornmentCommonClassName,
              'rounded-l-md border-r',
              adornmentProps?.className
            )}
          >
            {adornment}
          </div>
        )}
        <SelectTrigger
          {...selectTriggerProps}
          className={cn(
            'grow border-none max-h-full ring-offset-none placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:opacity-100',
            selectTriggerProps?.className
          )}
        >
          {children}
        </SelectTrigger>
        {adornmentPosition === 'end' && (
          <div
            {...adornmentProps}
            className={cn(
              adornmentCommonClassName,
              'rounded-r-md border-l',
              adornmentProps?.className
            )}
          >
            {adornment}
          </div>
        )}
      </div>
    );
  }
);
SelectWithAdornment.displayName = 'SelectWithAdornment';

export { SelectWithAdornment };
