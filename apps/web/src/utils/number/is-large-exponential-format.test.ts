import { isLargeExponentialFormat } from './is-large-exponential-format';

describe('isLargeExponentialFormat', () => {
  it('指数表記でしか表せない数を渡すとtrueを返す', () => {
    expect(isLargeExponentialFormat(123456789012345678901234567890)).toBe(true);
    expect(isLargeExponentialFormat(-123456789012345678901234567890)).toBe(true);
    expect(isLargeExponentialFormat('123456789012345678901234567890')).toBe(true);
    expect(isLargeExponentialFormat('-123456789012345678901234567890')).toBe(true);
  });

  it('指数形式でなくても表せる数を渡すとfalseを返す', () => {
    expect(isLargeExponentialFormat(1e5)).toBe(false);
    expect(isLargeExponentialFormat(-1e5)).toBe(false);
    expect(isLargeExponentialFormat('1e5')).toBe(false);
    expect(isLargeExponentialFormat('-1e5')).toBe(false);
  });

  it('指数形式でない数値を渡すとfalseを返す', () => {
    expect(isLargeExponentialFormat(100)).toBe(false);
    expect(isLargeExponentialFormat(-100)).toBe(false);
    expect(isLargeExponentialFormat('100')).toBe(false);
    expect(isLargeExponentialFormat('-100')).toBe(false);
  });

  it('数字でない文字列を渡すとfalseを返す', () => {
    expect(isLargeExponentialFormat('a')).toBe(false);
    expect(isLargeExponentialFormat('')).toBe(false);
  });

  it('e+が含まれる数字でない文字列を渡すとfalseを返す', () => {
    expect(isLargeExponentialFormat('teste+8')).toBe(false);
    expect(isLargeExponentialFormat('test-e+8')).toBe(false);
  });
});
