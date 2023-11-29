import { findKanjiNumbers } from '@/lib/japanese-numeral';
import { splitTextAndNumbers } from './split-text-and-numbers';

export const splitTextAndNumerals = (text: string) => {
  const findedKnajiNumbers = findKanjiNumbers(text);
  const sortedFindedKnajiNumbers = findedKnajiNumbers.sort((a, b) => b.length - a.length);

  // sortedFindedKnajiNumbersが空の場合は、textをそのまま返さないと一文字ずつ分割されてしまう
  const splitByKanjiNumbers =
    sortedFindedKnajiNumbers.length > 0
      ? text.split(new RegExp(`(${sortedFindedKnajiNumbers.join('|')})`))
      : [text];

  const splitByArabicNumbers = splitByKanjiNumbers
    .map((text) => {
      if (findKanjiNumbers(text).length === 0) {
        return splitTextAndNumbers(text);
      }
      return text;
    })
    .flat();

  return splitByArabicNumbers;
};
