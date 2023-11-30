import Decimal from 'decimal.js';
import { KUSODEKA } from '@/constants/kusodeka';
import { findKanjiNumbers, kanji2number, number2kanji } from '@/lib/japanese-numeral';
import { isLargeExponentialFormat } from './number/is-large-exponential-format';
import { isSmallExponentialFormat } from './number/is-small-exponential-format';

export const sacalingNumeralsInArray = (textAndNumbers: (string | number)[], scale: number) => {
  return textAndNumbers.map((textOrNumber) => {
    if (typeof textOrNumber === 'number') {
      const scaled = new Decimal(textOrNumber).times(scale).toNumber();

      if (isLargeExponentialFormat(scaled)) return KUSODEKA.XL;
      if (isSmallExponentialFormat(scaled)) return KUSODEKA.XS;
      return scaled;
    }

    if (findKanjiNumbers(textOrNumber)[0] === textOrNumber) {
      const scaled = new Decimal(kanji2number(textOrNumber)).times(scale);

      if (isLargeExponentialFormat(scaled.toString())) return KUSODEKA.XL;
      if (isSmallExponentialFormat(scaled.toString())) return KUSODEKA.XS;

      if (scaled.mod(1).equals(0)) {
        const kanji = number2kanji(scaled.toNumber());

        if (kanji.includes('undefined')) return KUSODEKA.XL;

        return kanji;
      }

      // ここ、文字列から数値にしているからDecimalの精度が失われている?
      const [upper, lower] = scaled.toString().split('.');

      const upperKanji = number2kanji(Number(upper));

      if (upperKanji.includes('undefined')) return KUSODEKA.XL;

      const lowerKanji = lower
        .split('')
        .map((num) => number2kanji(Number(num)))
        .join('');

      return `${upperKanji}・${lowerKanji}`;
    }

    return textOrNumber;
  });
};
