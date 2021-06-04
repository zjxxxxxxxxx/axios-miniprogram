import {
  isArray,
  isDate,
  isEmptyArray,
  isEmptyObject,
  isFunction,
  isNull,
  isPlainObject,
  isString,
  isUndefined,
} from '../../src/helpers/is';

describe('对 src/helpers/is.ts 进行测试', () => {
  it('测试 isArray() 执行结果是否符合预期', () => {
    expect(isArray([0])).toBe(true);
    expect(isArray([])).toBe(true);
    expect(isArray({})).toBe(false);
    expect(isArray(0)).toBe(false);
    expect(isArray('')).toBe(false);
    expect(isArray(undefined)).toBe(false);
    expect(isArray(null)).toBe(false);
  });

  it('测试 isDate() 执行结果是否符合预期', () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate({})).toBe(false);
    expect(isDate([])).toBe(false);
    expect(isDate(0)).toBe(false);
    expect(isDate('')).toBe(false);
    expect(isDate(undefined)).toBe(false);
    expect(isDate(null)).toBe(false);
  });

  it('测试 isEmptyArray() 执行结果是否符合预期', () => {
    expect(isEmptyArray([])).toBe(true);
    expect(isEmptyArray([0])).toBe(false);
    expect(isEmptyArray({})).toBe(false);
    expect(isEmptyArray(0)).toBe(false);
    expect(isEmptyArray('')).toBe(false);
    expect(isEmptyArray(undefined)).toBe(false);
    expect(isEmptyArray(null)).toBe(false);
  });

  it('测试 isEmptyObject() 执行结果是否符合预期', () => {
    expect(isEmptyObject({})).toBe(true);
    expect(isEmptyObject({ a: 0 })).toBe(false);
    expect(isEmptyObject([0])).toBe(false);
    expect(isEmptyObject([])).toBe(false);
    expect(isEmptyObject(0)).toBe(false);
    expect(isEmptyObject('')).toBe(false);
    expect(isEmptyObject(undefined)).toBe(false);
    expect(isEmptyObject(null)).toBe(false);
  });

  it('测试 isFunction() 执行结果是否符合预期', () => {
    expect(
      isFunction(() => {
        return;
      }),
    ).toBe(true);
    expect(
      isFunction(function () {
        return;
      }),
    ).toBe(true);
    expect(isFunction({})).toBe(false);
    expect(isFunction([])).toBe(false);
    expect(isFunction(0)).toBe(false);
    expect(isFunction('')).toBe(false);
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction(null)).toBe(false);
  });

  it('测试 isNull() 执行结果是否符合预期', () => {
    expect(isNull(null)).toBe(true);
    expect(isNull({ a: 0 })).toBe(false);
    expect(isNull([0])).toBe(false);
    expect(isNull([])).toBe(false);
    expect(isNull(0)).toBe(false);
    expect(isNull('')).toBe(false);
    expect(isNull(undefined)).toBe(false);
  });

  it('测试 isPlainObject() 执行结果是否符合预期', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ a: 0 })).toBe(true);
    expect(isPlainObject([0])).toBe(false);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(0)).toBe(false);
    expect(isPlainObject('')).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
    expect(isPlainObject(null)).toBe(false);
  });

  it('测试 isString() 执行结果是否符合预期', () => {
    expect(isString('')).toBe(true);
    expect(isString({})).toBe(false);
    expect(isString({ a: 0 })).toBe(false);
    expect(isString([0])).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString(0)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString(null)).toBe(false);
  });

  it('测试 isUndefined() 执行结果是否符合预期', () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined('')).toBe(false);
    expect(isUndefined({})).toBe(false);
    expect(isUndefined({ a: 0 })).toBe(false);
    expect(isUndefined([0])).toBe(false);
    expect(isUndefined([])).toBe(false);
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined(null)).toBe(false);
  });
});
