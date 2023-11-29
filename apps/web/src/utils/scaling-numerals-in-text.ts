import { sacalingNumeralsInArray } from './scaling-numerals-in-array';
import { splitTextAndNumerals } from './split-text-and-numerals';

export const scalingNumeralsInText = (text: string, scale: number): string =>
  sacalingNumeralsInArray(splitTextAndNumerals(text), scale).join('');
