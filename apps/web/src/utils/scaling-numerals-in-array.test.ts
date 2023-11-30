/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { KUSODEKA } from '@/constants/kusodeka';
import { sacalingNumeralsInArray } from './scaling-numerals-in-array';

describe('sacalingNumeralsInArray', () => {
  it('数値のみを含む配列を渡すと、その配列がスケール値でスケーリングされる', () => {
    expect(sacalingNumeralsInArray([123, 456], 2)).toEqual([246, 912]);
  });

  it('漢数字のみを含む配列を渡すと、その配列がスケール値でスケーリングされる', () => {
    expect(sacalingNumeralsInArray(['一', '二'], 2)).toEqual(['二', '四']);
  });

  it('数値と漢数字とその他の文字列が混在する配列を渡すと、その配列がスケール値でスケーリングされる', () => {
    expect(sacalingNumeralsInArray(['abc', 123, '一', 'def'], 2)).toEqual([
      'abc',
      246,
      '二',
      'def',
    ]);
  });

  it('スケールした結果が指数表記でしか表現できない大数の場合、クソデカが返される', () => {
    expect(
      sacalingNumeralsInArray([123456789012345678901234567890], 123456789012345678901234567890)
    ).toEqual([KUSODEKA.XL]);
  });

  it('スケールした結果が指数表記でしか表現できない小数の場合、クソちっさが返される', () => {
    expect(
      sacalingNumeralsInArray([0.000000000000000000000000000001], 0.000000000000000000000000000001)
    ).toEqual([KUSODEKA.XS]);
  });
});
