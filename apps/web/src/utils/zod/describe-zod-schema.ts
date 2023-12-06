/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodObject, z, ZodType } from 'zod';

type Descriptions<T extends ZodObject<any>> = {
  [K in keyof z.infer<T>]?: string;
};

/**
 * @description
 * この関数でdescriptionをつけるとAPIドキュメントなどに便利です \
 * auto-formではdescriptionを指定することでラベルを指定できます
 * @see https://github.com/vantezzen/auto-form#zod-configuration
 * @see https://github.com/vantezzen/auto-form/blob/main/src/components/ui/auto-form/fields/object.tsx#L24
 */
export const describeZodSchema = <T extends ZodObject<any>>(
  schema: T,
  descriptions: Descriptions<T>
): T => {
  const shape = schema.shape as { [K in keyof z.infer<T>]: ZodType<any> };
  const newShape: { [K in keyof z.infer<T>]: ZodType<any> } = {} as any;

  for (const key in shape) {
    const description = descriptions[key];

    if (description) {
      newShape[key] = shape[key].describe(description);
    } else {
      newShape[key] = shape[key];
    }
  }

  return z.object(newShape) as unknown as T;
};
