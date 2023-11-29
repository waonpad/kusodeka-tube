export const toHalfnums = (text: string): string =>
  text.replace(/[０-９．]/g, (m) => {
    if (m === '．') {
      return '.';
    }
    return '０１２３４５６７８９'.indexOf(m).toString();
  });
