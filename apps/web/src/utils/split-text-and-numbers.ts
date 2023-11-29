import { toHalfnums } from './format/to-half';

const normalRegex = /^(\D+)?(\d+)?(.*)$/;
const decimalRegex = /^(\D+)?(\d*\.?\d+)?(.*)$/;

export const splitTextAndNumbers = (
  str: string,
  {
    decimals,
  }: {
    decimals?: boolean;
  } = {
    decimals: true,
  }
): (string | number)[] => {
  const arr = [] as (string | number)[];
  const num_re = decimals ? decimalRegex : normalRegex;
  let s = toHalfnums(str);
  while (s) {
    const match = s.match(num_re);
    if (!match) {
      break;
    }
    if (match[1]) {
      arr.push(match[1]);
    }
    if (match[2]) {
      arr.push(Number(match[2]));
    }
    s = match[3];
  }

  return arr;
};
