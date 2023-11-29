import { findKanjiNumbers } from '@/lib/japanese-numeral';
import { splitTextAndNumbers } from './split-text-and-numbers';

export const splitTextAndNumerals = (text: string) => {
  const findedKnajiNumbers = findKanjiNumbers(text);
  const sortedFindedKnajiNumbers = findedKnajiNumbers.sort((a, b) => b.length - a.length);

  const splitByKanjiNumbers = text.split(new RegExp(`(${sortedFindedKnajiNumbers.join('|')})`));

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
