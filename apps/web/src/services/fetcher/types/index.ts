export type HttpResponse<T> = {
  data: T | null;
  error: Err | null;
  status: number;
};

export type Err = {
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

export type ErrResponse = {
  data: null;
  error: Err;
  status: number;
};
