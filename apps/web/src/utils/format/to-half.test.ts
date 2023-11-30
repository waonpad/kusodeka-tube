import { toHalfnums } from './to-half';

describe('toHalfnums', () => {
  it('全角の数字を含む文字列を渡すと、その全角の数字が半角に変換される', () => {
    expect(toHalfnums('１２３４５')).toBe('12345');
  });

  it('全角のピリオドを含む文字列を渡すと、その全角のピリオドが半角に変換される', () => {
    expect(toHalfnums('１．２３')).toBe('1.23');
  });

  it('半角の数字やピリオドを含む文字列を渡すと、その文字列は変更されない', () => {
    expect(toHalfnums('12345')).toBe('12345');
    expect(toHalfnums('1.23')).toBe('1.23');
  });

  it('数字やピリオドを含まない文字列を渡すと、その文字列は変更されない', () => {
    expect(toHalfnums('テスト')).toBe('テスト');
  });

  it('探索対象とそうでない文字列が混在する文字列を渡すと、探索対象の文字列のみ変更される', () => {
    expect(toHalfnums('１２３４５テスト')).toBe('12345テスト');
  });
});
