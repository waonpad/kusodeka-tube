import { NextRequest } from 'next/server';

export const reqSearchParams = (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  return Object.fromEntries(searchParams.entries());
};
