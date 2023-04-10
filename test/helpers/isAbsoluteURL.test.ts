import { describe, test, expect } from 'vitest';
import { isAbsoluteURL } from '@/helpers/isAbsoluteURL';

describe('src/helpers/isAbsoluteURL.ts', () => {
  test('应该不是绝对路径', () => {
    expect(isAbsoluteURL('user')).toBeFalsy();
    expect(isAbsoluteURL('/test')).toBeFalsy();
    expect(isAbsoluteURL('//test')).toBeFalsy();
    expect(isAbsoluteURL('://test')).toBeFalsy();
  });

  test('应该是绝对路径', () => {
    expect(isAbsoluteURL('http://test')).toBeTruthy();
    expect(isAbsoluteURL('HTTP://test')).toBeTruthy();
    expect(isAbsoluteURL('https://test')).toBeTruthy();
    expect(isAbsoluteURL('custom://test')).toBeTruthy();
    expect(isAbsoluteURL('custom-v1.0://test')).toBeTruthy();
    expect(isAbsoluteURL('custom_v1.0://test')).toBeTruthy();
  });
});
