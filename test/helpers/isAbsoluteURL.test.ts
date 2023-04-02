import { describe, test, expect } from 'vitest';
import { isAbsoluteURL } from 'src/helpers/isAbsoluteURL';

describe('src/helpers/isAbsoluteURL.ts', () => {
  test('应该不是绝对路径', () => {
    expect(isAbsoluteURL('user')).toBeFalsy();
    expect(isAbsoluteURL('/user')).toBeFalsy();
    expect(isAbsoluteURL('//user')).toBeFalsy();
    expect(isAbsoluteURL('://user')).toBeFalsy();
  });

  test('应该是绝对路径', () => {
    expect(isAbsoluteURL('http://user')).toBeTruthy();
    expect(isAbsoluteURL('HTTP://user')).toBeTruthy();
    expect(isAbsoluteURL('https://user')).toBeTruthy();
    expect(isAbsoluteURL('custom://user')).toBeTruthy();
    expect(isAbsoluteURL('custom-v1.0://user')).toBeTruthy();
    expect(isAbsoluteURL('custom_v1.0://user')).toBeTruthy();
  });
});
