import { isSmallExponentialFormat } from './is-small-exponential-format';

describe('isSmallExponentialFormat', () => {
  it('指数表記でしか表せない小数を渡すとtrueを返す', () => {
    expect(isSmallExponentialFormat(1e-8)).toBe(true);
    expect(isSmallExponentialFormat(-1e-8)).toBe(true);
    expect(isSmallExponentialFormat('1e-8')).toBe(true);
    expect(isSmallExponentialFormat('-1e-8')).toBe(true);
  });

  it('指数形式でなくても表せる小数を渡すとfalseを返す', () => {
    expect(isSmallExponentialFormat(1e-5)).toBe(false);
    expect(isSmallExponentialFormat(-1e-5)).toBe(false);
    expect(isSmallExponentialFormat('1e-5')).toBe(false);
    expect(isSmallExponentialFormat('-1e-5')).toBe(false);
  });

  it('指数形式でない数値を渡すとfalseを返す', () => {
    expect(isSmallExponentialFormat(100)).toBe(false);
    expect(isSmallExponentialFormat(-100)).toBe(false);
    expect(isSmallExponentialFormat('100')).toBe(false);
    expect(isSmallExponentialFormat('-100')).toBe(false);
  });

  it('数字でない文字列を渡すとfalseを返す', () => {
    expect(isSmallExponentialFormat('a')).toBe(false);
    expect(isSmallExponentialFormat('')).toBe(false);
  });

  it('e-が含まれる数字でない文字列を渡すとfalseを返す', () => {
    expect(isSmallExponentialFormat('teste-8')).toBe(false);
    expect(isSmallExponentialFormat('test-e-8')).toBe(false);
  });
});
