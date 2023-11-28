export const errors: Record<
  string,
  {
    code: string;
    name: string;
    message: string;
    status: number;
  }
> = {
  VALIDATION: {
    code: 'VALIDATION',
    name: 'Validation Error',
    message: 'Validation Error',
    status: 422,
  },
};
