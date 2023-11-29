export const isLargeExponentialFormat = (number: number | string): boolean => {
  const numStr = String(number);

  const regex = /^[+-]?\d+(\.\d*)?([eE][+]\d+)$/;
  return regex.test(numStr);
};
