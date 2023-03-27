import { describe, test, expect } from 'vitest';
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
  test('传入数组应该返回 true，其他参数应该返回 fasle', () => {
    expect(isArray([0])).toBe(true);
    expect(isArray([])).toBe(true);
    expect(isArray({})).toBe(false);
    expect(isArray(0)).toBe(false);
    expect(isArray('')).toBe(false);
    expect(isArray(undefined)).toBe(false);
    expect(isArray(null)).toBe(false);
  });

  test('传入 Date 实例应该返回 true，其他参数应该返回 fasle', () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate({})).toBe(false);
    expect(isDate([])).toBe(false);
    expect(isDate(0)).toBe(false);
    expect(isDate('')).toBe(false);
    expect(isDate(undefined)).toBe(false);
    expect(isDate(null)).toBe(false);
  });

  test('传入空数组应该返回 true，其他参数应该返回 fasle', () => {
    expect(isEmptyArray([])).toBe(true);
    expect(isEmptyArray([0])).toBe(false);
    expect(isEmptyArray({})).toBe(false);
    expect(isEmptyArray(0)).toBe(false);
    expect(isEmptyArray('')).toBe(false);
    expect(isEmptyArray(undefined)).toBe(false);
    expect(isEmptyArray(null)).toBe(false);
  });

  test('传入空对象应该返回 true，其他参数应该返回 fasle', () => {
    expect(isEmptyObject({})).toBe(true);
    expect(isEmptyObject({ a: 0 })).toBe(false);
    expect(isEmptyObject([0])).toBe(false);
    expect(isEmptyObject([])).toBe(false);
    expect(isEmptyObject(0)).toBe(false);
    expect(isEmptyObject('')).toBe(false);
    expect(isEmptyObject(undefined)).toBe(false);
    expect(isEmptyObject(null)).toBe(false);
  });

  test('传入空函数应该返回 true，其他参数应该返回 fasle', () => {
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

  test('传入空 null 应该返回 true，其他参数应该返回 fasle', () => {
    expect(isNull(null)).toBe(true);
    expect(isNull({ a: 0 })).toBe(false);
    expect(isNull([0])).toBe(false);
    expect(isNull([])).toBe(false);
    expect(isNull(0)).toBe(false);
    expect(isNull('')).toBe(false);
    expect(isNull(undefined)).toBe(false);
  });

  test('传入普通对象应该返回 true，其他参数应该返回 fasle', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ a: 0 })).toBe(true);
    expect(isPlainObject([0])).toBe(false);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(0)).toBe(false);
    expect(isPlainObject('')).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
    expect(isPlainObject(null)).toBe(false);
  });

  test('传入字符串应该返回 true，其他参数应该返回 fasle', () => {
    expect(isString('')).toBe(true);
    expect(isString({})).toBe(false);
    expect(isString({ a: 0 })).toBe(false);
    expect(isString([0])).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString(0)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString(null)).toBe(false);
  });

  test('传入 undefined 应该返回 true，其他参数应该返回 fasle', () => {
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
