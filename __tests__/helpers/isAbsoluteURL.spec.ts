import isAbsoluteURL from '../../src/helpers/isAbsoluteURL';

describe('测试 src/helpers/isAbsoluteURL.ts', () => {
  it('run', () => {
    expect(isAbsoluteURL('1/2')).toBe(false);
    expect(isAbsoluteURL('/1/2')).toBe(false);
    expect(isAbsoluteURL('///1/2')).toBe(true);
    expect(isAbsoluteURL('http://1/2')).toBe(true);
  });
});
