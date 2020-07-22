import transformResponse from '../../src/core/transformResponse';

describe('测试 src/core/transformResponse.ts', () => {
  it('默认', () => {
    expect(transformResponse({ data: {} }, {})).toEqual({
      status: 400,
      statusText: 'Bad Adapter',
      data: {},
      headers: {},
      config: {},
      cookies: undefined,
      profile: undefined,
    });
  });

  it('status + headers', () => {
    expect(transformResponse({ status: 200, headers: { status: 'ok' }, data: {} }, {})).toEqual({
      status: 200,
      statusText: 'OK',
      data: {},
      headers: { status: 'ok' },
      config: {},
      cookies: undefined,
      profile: undefined,
    });
  });
  it('statusCode + header', () => {
    expect(transformResponse({ statusCode: 204, header: { status: 'ok' }, data: {} }, {})).toEqual({
      status: 204,
      statusText: '',
      data: {},
      headers: { status: 'ok' },
      config: {},
      cookies: undefined,
      profile: undefined,
    });
  });
});
