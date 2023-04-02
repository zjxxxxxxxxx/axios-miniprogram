import { describe, test, expect } from 'vitest';
import { combineURL } from 'src/helpers/combineURL';

describe('src/helpers/combineURL.ts', () => {
  test('应该直接返回第一个参数', () => {
    expect(combineURL('http://api.com', '')).toBe('http://api.com');
    expect(combineURL('file://api.com', '')).toBe('file://api.com');
    expect(combineURL('unknow://api.com', '')).toBe('unknow://api.com');
  });

  test('应该得到拼接后的结果', () => {
    expect(combineURL('http://api.com', '/user')).toBe('http://api.com/user');
    expect(combineURL('file://api.com', '/user')).toBe('file://api.com/user');
    expect(combineURL('unknow://api.com', '/user')).toBe(
      'unknow://api.com/user',
    );
  });

  test('应该清理多余的斜线', () => {
    expect(combineURL('//api//', '//user//')).toBe('/api/user/');
    expect(combineURL('http://api.com//', '//user//')).toBe(
      'http://api.com/user/',
    );
  });
});
