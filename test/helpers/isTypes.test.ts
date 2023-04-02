import { describe, test, expect } from 'vitest';
import {
  isArray,
  isDate,
  isEmptyArray,
  isPlainObject,
  isFunction,
  isNull,
  isUndefined,
  isString,
} from 'src/helpers/isTypes';

describe('src/helpers/isTypes.ts', () => {
  test('应该能判断是数组', () => {
    expect(isArray(new Array(1))).toBeTruthy();
    expect(isArray([])).toBeTruthy();
    expect(isArray([1])).toBeTruthy();
  });

  test('应该能判断是空数组', () => {
    expect(isEmptyArray([1])).toBeFalsy();
    expect(isArray(new Array(0))).toBeTruthy();
    expect(isEmptyArray([])).toBeTruthy();
  });

  test('应该能判断是普通对象', () => {
    expect(isPlainObject(new String())).toBeFalsy();
    expect(isPlainObject(new Function())).toBeFalsy();
    expect(isPlainObject({ v: 1 })).toBeTruthy();
    expect(isPlainObject(new Object())).toBeTruthy();
  });

  test('应该能判断是日期', () => {
    expect(isDate({})).toBeFalsy();
    expect(isDate(new Date())).toBeTruthy();
  });

  test('应该能判断是函数', () => {
    expect(isFunction(() => null)).toBeTruthy();
    expect(
      isFunction(function () {
        return;
      }),
    ).toBeTruthy();
    expect(isFunction(new Function())).toBeTruthy();
  });

  test('应该能判断是 Null', () => {
    expect(isNull(undefined)).toBeFalsy();
    expect(isNull(null)).toBeTruthy();
  });

  test('应该能判断是 Undefined', () => {
    expect(isUndefined(null)).toBeFalsy();
    expect(isUndefined(undefined)).toBeTruthy();
  });

  test('应该能判断是字符串', () => {
    expect(isString(new String())).toBeTruthy();
    expect(isString('')).toBeTruthy();
    expect(isString(``)).toBeTruthy();
  });
});
