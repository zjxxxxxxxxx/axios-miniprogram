import { describe, test, expect } from 'vitest';
import { combineURL } from 'src/helpers/combineURL';

describe('src/helpers/combineURL.ts', () => {
  test('应该直接返回第一个参数', () => {
    expect(combineURL('http://api.com', '')).toBe('http://api.com');
    expect(combineURL('file://api.com', '')).toBe('file://api.com');
    expect(combineURL('unknow://api.com', '')).toBe('unknow://api.com');
  });

  test('应该得到拼接后的结果', () => {
    expect(combineURL('http://api.com', 'test')).toBe('http://api.com/test');
    expect(combineURL('file://api.com', '/test')).toBe('file://api.com/test');
    expect(combineURL('unknow://api.com', '/test')).toBe(
      'unknow://api.com/test',
    );
  });

  test('应该清理多余的斜线', () => {
    expect(combineURL('//api//', 'test//')).toBe('/api/test/');
    expect(combineURL('//api//', '//test//')).toBe('/api/test/');
    expect(combineURL('http://api.com//', '//test//')).toBe(
      'http://api.com/test/',
    );
  });
});
