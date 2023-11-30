import { splitTextAndNumerals } from './split-text-and-numerals';

describe('splitTextAndNumerals', () => {
  it('漢数字とアラビア数字とそれ以外の文字列が混在する文字列を渡すと、その文字列が漢数字とアラビア数字とそれ以外の文字列に分割される', () => {
    expect(splitTextAndNumerals('abc一二三123def四五六456')).toEqual([
      'abc',
      '一二三',
      123,
      'def',
      '四五六',
      456,
    ]);
  });

  it('漢数字のみを含む文字列を渡すと、その文字列が漢数字のみの配列に変換される', () => {
    expect(splitTextAndNumerals('一二三四五六')).toEqual(['一二三四五六']);
  });

  it('アラビア数字のみを含む文字列を渡すと、その文字列がアラビア数字のみの配列に変換される', () => {
    expect(splitTextAndNumerals('123456')).toEqual([123456]);
  });

  it('漢数字やアラビア数字を含まない文字列を渡すと、その文字列がそのままの配列に変換される', () => {
    expect(splitTextAndNumerals('abcdef')).toEqual(['abcdef']);
  });

  it('漢数字とアラビア数字が連続する文字列を渡すと、その文字列が漢数字とアラビア数字とそれ以外の文字列に分割される', () => {
    expect(splitTextAndNumerals('abc一二三123四五六456')).toEqual([
      'abc',
      '一二三',
      123,
      '四五六',
      456,
    ]);
  });

  it('漢数字とアラビア数字が連続することで意味をなす文字列を含む文字列を渡すと、その部分は一つの文字列として扱われる', () => {
    expect(splitTextAndNumerals('abc壱百50円')).toEqual(['abc', '壱百50', '円']);
  });
});
