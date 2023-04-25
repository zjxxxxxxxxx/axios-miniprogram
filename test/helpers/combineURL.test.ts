import { describe, test, expect } from 'vitest';
import { combineURL } from '@/helpers/combineURL';

describe('src/helpers/combineURL.ts', () => {
  test('应该直接返回第一个参数', () => {
    expect(combineURL('http://api.com', '')).toBe('http://api.com');
    expect(combineURL('file://api.com', '')).toBe('file://api.com');
  });

  test('应该直接返回第二个参数', () => {
    expect(combineURL('', 'http://api.com')).toBe('http://api.com');
    expect(combineURL('', 'file://api.com')).toBe('file://api.com');
  });

  test('应该得到拼接后的结果', () => {
    expect(combineURL('http://api.com', 'test')).toBe('http://api.com/test');
    expect(combineURL('http://api.com/', 'test')).toBe('http://api.com/test');
    expect(combineURL('http://api.com', '/test')).toBe('http://api.com/test');
    expect(combineURL('http://api.com/', '/test')).toBe('http://api.com/test');
  });

  test('应该保留末尾自带的斜线', () => {
    expect(combineURL('http://api.com/', '')).toBe('http://api.com/');
    expect(combineURL('http://api.com', '/')).toBe('http://api.com/');
    expect(combineURL('http://api.com/', '/')).toBe('http://api.com/');
    expect(combineURL('http://api.com', 'test/')).toBe('http://api.com/test/');
  });
});
