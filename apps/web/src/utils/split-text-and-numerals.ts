import { findKanjiNumbers } from '@/lib/japanese-numeral';
import { splitTextAndNumbers } from './split-text-and-numbers';

export const splitTextAndNumerals = (text: string) => {
  // 改行コードを一時的に別の文字列に置き換える
  // ¥r¥n, ¥r, ¥n, ¥u2028, ¥u2029
  const replacedText = text.replace(/\r\n|\r|\n|\u2028|\u2029/g, ' NEWLINE ');

  const findedKnajiNumbers = findKanjiNumbers(replacedText);

  const sortedFindedKnajiNumbers = findedKnajiNumbers.sort((a, b) => b.length - a.length);

  const splitByKanjiNumbers =
    sortedFindedKnajiNumbers.length > 0
      ? replacedText.split(new RegExp(`(${sortedFindedKnajiNumbers.join('|')})`))
      : [replacedText];

  const splitByArabicNumbers = splitByKanjiNumbers
    .map((t) => {
      if (findKanjiNumbers(t).length === 0) {
        return splitTextAndNumbers(t);
      }
      return t;
    })
    .flat();

  // 置き換えた改行コードを元に戻す
  const result = splitByArabicNumbers.map((item) => {
    if (typeof item === 'string') {
      return item.replace(/ NEWLINE /g, '\n');
    }
    return item;
  });

  return result;
};
