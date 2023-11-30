import { scalingNumeralsInText } from './scaling-numerals-in-text';

describe('scalingNumeralsInText', () => {
  it('改行コードを含んでいても正常にスケーリングされる', () => {
    // このテストはsplitTextAndNumeralsのテストとしたほうがいいか
    expect(
      scalingNumeralsInText(
        'いつか１００満点のお嬢様になりたい一般人ですわ。\n皆様方に１００満点の笑顔をお届けしたいですわ～～！\n',
        2
      )
    ).toBe(
      'いつか200満点のお嬢様になりたい二般人ですわ。\n皆様方に200満点の笑顔をお届けしたいですわ～～！\n'
    );
  });
});
