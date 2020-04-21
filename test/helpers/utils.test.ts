/*
 * @Author: early-autumn
 * @Date: 2020-04-20 10:02:56
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-20 10:23:45
 */
import { encode, isDate, isPlainObject, deepMerge, pick, omit } from '../../src/helpers/utils';

describe('测试 src/helpers/utils.ts', () => {
  it('encode 特殊字符转换', () => {
    expect(encode('@:, []$')).toBe('@:,+[]$');
  });

  it('isDate', () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate('')).toBe(false);
    expect(isDate(Date)).toBe(false);
  });

  it('isPlainObject', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
    expect(isPlainObject('')).toBe(false);
    expect(isPlainObject(Object)).toBe(false);
  });

  it('deepMerge', () => {
    expect(deepMerge({}, {})).toEqual({});
    expect(deepMerge({ a: 0, b: '1', c: { a: 0, b: '1' } }, { a: 1, b: '1', c: { a: 1, b: '1' } })).toEqual({
      a: 1,
      b: '1',
      c: { a: 1, b: '1' },
    });
  });

  it('pick', () => {
    expect(pick({})).toEqual({});

    expect(pick({ a: 0, b: 0 }, 'a')).toEqual({ a: 0 });
  });

  it('omit', () => {
    expect(omit({})).toEqual({});

    expect(omit({ a: 0, b: 0 }, 'a')).toEqual({ b: 0 });
  });
});
