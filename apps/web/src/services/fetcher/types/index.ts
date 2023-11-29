export type HttpResponse<T> = {
  data: T | null;
  error: Error | null;
  status: number;
};

export type Error = {
  code?: string;
  name?: string;
  message: string;
  status: number;
  errors?: {
    code?: string;
    name?: string;
    message: string;
  }[];
};

export type ErrorResponse = {
  data: null;
  error: Error;
  status: number;
};
