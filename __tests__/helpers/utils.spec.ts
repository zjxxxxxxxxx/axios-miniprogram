import {
  assert,
  deepMerge,
  omit,
  pick,
  throwError,
  toLowerCase,
  toUpperCase,
} from '../../src/helpers/utils';

describe('对 src/helpers/utils.ts 进行测试', () => {
  it('测试 assert() 执行结果是否符合预期', () => {
    expect(assert(true, '')).toBeUndefined();
    expect(() => assert(false, '')).toThrow();
    expect(() => assert(false, 'msg')).toThrowError('[axios-miniprogram]: msg');
  });

  it('测试 deepMerge() 执行结果是否符合预期', () => {
    expect(deepMerge({})).toEqual({});
    expect(deepMerge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
    expect(deepMerge({ a: { a: 1 } }, { a: { b: 2 } })).toEqual({
      a: { a: 1, b: 2 },
    });
    expect(deepMerge({ a: { a: 1, b: 1 } }, { a: { a: 2, b: 2 } })).toEqual({
      a: { a: 2, b: 2 },
    });
    expect(deepMerge({ a: { a: 1 } }, { a: 2 })).toEqual({
      a: 2,
    });
  });

  it('测试 omit() 执行结果是否符合预期', () => {
    expect(omit({})).toEqual({});
    expect(omit({ a: 1, b: 1 }, 'a')).toEqual({ b: 1 });
    expect(omit({ a: 1, b: 1 }, 'a', 'b')).toEqual({});
  });

  it('测试 pick() 执行结果是否符合预期', () => {
    expect(pick({})).toEqual({});
    expect(pick({ a: 1, b: 1 }, 'a')).toEqual({ a: 1 });
    expect(pick({ a: 1, b: 1 }, 'a', 'b')).toEqual({ a: 1, b: 1 });
  });

  it('测试 throwError() 执行结果是否符合预期', () => {
    expect(() => throwError('')).toThrowError('[axios-miniprogram]: ');
    expect(() => throwError('msg')).toThrowError('[axios-miniprogram]: msg');
    expect(() => throwError(' msg ')).toThrowError(
      '[axios-miniprogram]:  msg ',
    );
  });

  it('测试 toLowerCase() 执行结果是否符合预期', () => {
    expect(toLowerCase('', 'GET')).toBe('');
    expect(toLowerCase(undefined, 'GET')).toBe('get');
    expect(toLowerCase('GET', '')).toBe('get');
    expect(toLowerCase('Get', '')).toBe('get');
  });

  it('测试 toUpperCase() 执行结果是否符合预期', () => {
    expect(toUpperCase('', 'get')).toBe('');
    expect(toUpperCase(undefined, 'get')).toBe('GET');
    expect(toUpperCase('get', '')).toBe('GET');
    expect(toUpperCase('Get', '')).toBe('GET');
  });
});
