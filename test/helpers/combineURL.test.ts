import combineURL from '../../src/helpers/combineURL';

describe('测试 src/helpers/combineURL.ts', () => {
  it('run', () => {
    expect(combineURL('1/2', '3/4')).toBe('1/2/3/4');
    expect(combineURL('1/2///', '////3/4')).toBe('1/2/3/4');
  });
});
