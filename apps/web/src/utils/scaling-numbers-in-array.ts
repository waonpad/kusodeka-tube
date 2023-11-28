export const scalingNumbersInArray = (
  arr: (string | number)[],
  scale: number
): (string | number)[] => {
  return arr.map((v) => {
    if (typeof v === 'number') {
      return v * scale;
    } else {
      return v;
    }
  });
};
