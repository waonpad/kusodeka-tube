export const isLargeExponentialFormat = (number: number | string): boolean => {
  const num = Number(number);

  const numStr = num.toString();

  const regex = /^[+-]?\d+(\.\d*)?([eE][+]\d+)$/;
  return regex.test(numStr);
};
