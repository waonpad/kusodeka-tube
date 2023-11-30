import { NextRequest } from 'next/server';
import { reqSearchParams } from './req-search-params';

describe('reqSearchParams', () => {
  it('複数の単純な文字列のクエリパラメータを含むURLを渡すと、オブジェクトに変換される', () => {
    // モックのNextRequestオブジェクトを作成
    const mockReq = {
      url: 'http://localhost:8080/?param1=value1&param2=value2',
    } as NextRequest;

    // reqSearchParams関数を呼び出し
    const result = reqSearchParams(mockReq);

    // 戻り値が期待通りであることを確認
    expect(result).toEqual({
      param1: 'value1',
      param2: 'value2',
    });
  });
});
