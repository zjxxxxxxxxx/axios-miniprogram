import { methodToLowercase, methodToUppercase } from '../../src/core/transformMethod';

describe('测试 src/core/transformMethod.ts', () => {
  it('默认', () => {
    expect(methodToLowercase()).toBe('get');
    expect(methodToUppercase()).toBe('GET');
  });

  it('传参', () => {
    expect(methodToLowercase('POST')).toBe('post');
    expect(methodToUppercase('post')).toBe('POST');
  });
});
