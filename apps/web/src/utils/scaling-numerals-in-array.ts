import { findKanjiNumbers, kanji2number, number2kanji } from '@/lib/japanese-numeral';

export const sacalingNumeralsInArray = (textAndNumbers: (string | number)[], scale: number) => {
  return textAndNumbers.map((textOrNumber) => {
    if (typeof textOrNumber === 'number') {
      return textOrNumber * scale;
    }

    if (findKanjiNumbers(textOrNumber)[0] === textOrNumber) {
      const scaled = kanji2number(textOrNumber) * scale;

      if (scaled % 1 === 0) {
        return number2kanji(scaled);
      }

      const [upper, lower] = scaled.toString().split('.');

      const upperKanji = number2kanji(Number(upper));

      const lowerKanji = lower
        .split('')
        .map((num) => number2kanji(Number(num)))
        .join('');

      return `${upperKanji}・${lowerKanji}`;
    }
    return textOrNumber;
  });
};
