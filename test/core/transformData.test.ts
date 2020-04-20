/*
 * @Author: early-autumn
 * @Date: 2020-04-20 20:31:29
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-20 20:38:49
 */
import { Data } from '../../src/types';
import transformData from '../../src/core/transformData';

describe('测试 src/core/transformData.ts', () => {
  it('默认', () => {
    expect(transformData({ a: 1 }, {})).toEqual({ a: 1 });
  });

  it('转换', () => {
    function transform(data: Data) {
      return data + '1';
    }
    expect(transformData('1', {}, transform)).toEqual('11');
  });

  it('多次转换', () => {
    const transforms = [
      function transform(data: Data) {
        return data + '1';
      },
      function transform(data: Data) {
        return data + '1';
      },
    ];
    expect(transformData('1', {}, transforms)).toEqual('111');
  });
});
