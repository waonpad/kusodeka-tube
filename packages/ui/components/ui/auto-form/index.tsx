import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { DefaultValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { cn } from 'ui/lib/utils';
import { Button } from '../button';
import { Form } from '../form';
import AutoFormObject from './fields/object';
import type { FieldConfig } from './types';
import type { ZodObjectOrWrapped } from './utils';
import { getDefaultValues, getObjectFormSchema } from './utils';

export function AutoFormSubmit({ children }: { children?: React.ReactNode }): JSX.Element {
  return <Button type="submit">{children ?? 'Submit'}</Button>;
}

export function AutoForm<SchemaType extends ZodObjectOrWrapped>({
  formSchema,
  values: valuesProp,
  onValuesChange: onValuesChangeProp,
  onParsedValuesChange,
  onSubmit: onSubmitProp,
  fieldConfig,
  children,
  className,
}: {
  formSchema: SchemaType;
  values?: Partial<z.infer<SchemaType>>;
  onValuesChange?: (values: Partial<z.infer<SchemaType>>) => void;
  onParsedValuesChange?: (values: Partial<z.infer<SchemaType>>) => void;
  onSubmit?: (values: z.infer<SchemaType>) => void;
  fieldConfig?: FieldConfig<z.infer<SchemaType>>;
  children?: React.ReactNode;
  className?: string;
}): JSX.Element {
  const objectFormSchema = getObjectFormSchema(formSchema);
  const defaultValues: DefaultValues<z.infer<typeof objectFormSchema>> =
    getDefaultValues(objectFormSchema);

  const form = useForm<z.infer<typeof objectFormSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    values: valuesProp,
  });

  function onSubmit(values: z.infer<typeof formSchema>): void {
    const parsedValues = formSchema.safeParse(values);
    if (parsedValues.success) {
      onSubmitProp?.(parsedValues.data);
    }
  }

  return (
    <Form {...form}>
      <form
        className={cn('space-y-5', className)}
        onChange={() => {
          const values = form.getValues();
          onValuesChangeProp?.(values);
          const parsedValues = formSchema.safeParse(values);
          if (parsedValues.success) {
            onParsedValuesChange?.(parsedValues.data);
          }
        }}
        onSubmit={(e) => {
          void form.handleSubmit(onSubmit)(e);
        }}
      >
        <AutoFormObject fieldConfig={fieldConfig} form={form} schema={objectFormSchema} />

        {children}
      </form>
    </Form>
  );
}
