import { splitTextAndNumbers } from './split-text-and-numbers';

describe('splitTextAndNumbers', () => {
  it('数字と非数字が混在する文字列を渡すと、その文字列が数字と非数字の部分に分割される', () => {
    expect(splitTextAndNumbers('abc123def456')).toEqual(['abc', 123, 'def', 456]);
  });

  it('小数点以下の数字を含む文字列を渡すと、その文字列が数字と非数字の部分に分割される', () => {
    expect(splitTextAndNumbers('abc123.456def789.012', { decimals: true })).toEqual([
      'abc',
      123.456,
      'def',
      789.012,
    ]);
  });

  it('ピリオドを小数点として扱わないオプションを有効にすると、ピリオドを非数字の部分に分割する', () => {
    expect(splitTextAndNumbers('abc123.456def789.012', { decimals: false })).toEqual([
      'abc',
      123,
      '.',
      456,
      'def',
      789,
      '.',
      12,
    ]);
  });

  it('数字のみを含む文字列を渡すと、その文字列が数字のみの配列に変換される', () => {
    expect(splitTextAndNumbers('123456')).toEqual([123456]);
  });

  it('非数字のみを含む文字列を渡すと、その文字列が非数字のみの配列に変換される', () => {
    expect(splitTextAndNumbers('abcdef')).toEqual(['abcdef']);
  });
});
