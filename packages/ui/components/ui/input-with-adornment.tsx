import type { HTMLAttributes } from 'react';
import React, { forwardRef } from 'react';
import { cn } from 'ui/lib/utils';
import type { InputProps } from './input';
import { Input } from './input';

export interface InputWithAdornmentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  adornment: React.ReactNode;
  adornmentPosition?: 'start' | 'end';
  adornmentProps?: HTMLAttributes<HTMLDivElement>;
  inputProps?: InputProps;
}

const adornmentCommonClassName = 'flex items-center p-2 text-sm h-10 border-input';

const InputWithAdornment = forwardRef<HTMLDivElement, InputWithAdornmentProps>(
  (
    { className, adornment, adornmentPosition = 'start', adornmentProps, inputProps, ...props },
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
        <Input
          {...inputProps}
          className={cn(
            'grow border-none max-h-full ring-offset-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-100',
            inputProps?.className
          )}
        />
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
InputWithAdornment.displayName = 'InputWithAdornment';

export { InputWithAdornment };
