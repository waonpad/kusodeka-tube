/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { isoToSeconds, secondsToIso } from './dayjs';

describe('isoToSeconds', () => {
  it('ISO 8601形式の期間を秒に変換する', () => {
    expect(isoToSeconds('PT1H')).toBe(3600);
    expect(isoToSeconds('PT1M')).toBe(60);
    expect(isoToSeconds('PT1S')).toBe(1);
  });

  it('ISO 8601形式でない文字列を渡すとNaNを返す', () => {
    expect(isoToSeconds('')).toBeNaN();
    expect(isoToSeconds('test')).toBeNaN();
  });

  it('指数表記の含まれるISO 8601形式の期間を渡すとNaNを返す', () => {
    expect(isoToSeconds('P3.914789098564995e+21Y1M1DT19H47M45.024S')).toBeNaN();
    expect(isoToSeconds('-P3.914789098564995e+21Y1M1DT19H47M45.024S')).toBeNaN();
  });
});

describe('secondsToIso', () => {
  it('秒をISO 8601形式の期間に変換する', () => {
    expect(secondsToIso(3600)).toBe('PT1H');
    expect(secondsToIso(60)).toBe('PT1M');
    expect(secondsToIso(1)).toBe('PT1S');
  });

  it('NaNを渡すとP0Dを返す', () => {
    expect(secondsToIso(NaN)).toBe('P0D');
  });

  it('Infinityを渡すとPInfinityYを返す', () => {
    expect(secondsToIso(Infinity)).toBe('PInfinityY');
    expect(secondsToIso(-Infinity)).toBe('-PInfinityY');
  });

  it('指数表記でしか表せない大きい数を渡すと指数表記になる', () => {
    expect(secondsToIso(123456789012345678901234567890)).toBe(
      'P3.914789098564995e+21Y1M1DT19H47M45.024S'
    );
    expect(secondsToIso(-123456789012345678901234567890)).toBe(
      '-P3.914789098564995e+21Y1M1DT19H47M45.024S'
    );
  });

  it('指数表記でしか表せない小さい数を渡すとP0Dを返す', () => {
    expect(secondsToIso(1e-8)).toBe('P0D');
    expect(secondsToIso(-1e-8)).toBe('P0D');
  });
});
