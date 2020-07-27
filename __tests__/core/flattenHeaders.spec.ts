import flattenHeaders from '../../src/core/flattenHeaders';

describe('测试 src/core/flattenHeaders.ts', () => {
  it('默认', () => {
    expect(flattenHeaders({})).toEqual({});
    expect(flattenHeaders({ headers: {} })).toEqual({});
  });

  it('默认 get', () => {
    expect(
      flattenHeaders({
        headers: {
          common: { common: 'common' },
          get: { get: 'get' },
          post: { post: 'post' },
          rest: 'rest',
        },
      })
    ).toEqual({ common: 'common', get: 'get', rest: 'rest' });
  });

  it('拉平', () => {
    expect(
      flattenHeaders({
        method: 'post',
        headers: {
          common: { common: 'common' },
          get: { get: 'get' },
          post: { post: 'post' },
          rest: 'rest',
        },
      })
    ).toEqual({ common: 'common', post: 'post', rest: 'rest' });
  });
});
