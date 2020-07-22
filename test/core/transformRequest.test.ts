import transformRequest from '../../src/core/transformRequest';

describe('测试 src/core/transformRequest.ts', () => {
  it('默认', () => {
    expect(transformRequest({})).toEqual({
      url: '/',
      method: 'GET',
      headers: undefined,
      data: undefined,
      dataType: undefined,
      enableCache: undefined,
      enableHttp2: undefined,
      enableQuic: undefined,
      header: undefined,
      responseType: undefined,
      sslVerify: undefined,
      timeout: undefined,
    });
  });

  it('基本', () => {
    const request = transformRequest({
      baseURL: 'https://www.xxx.com///',
      method: 'get',
      url: '/test',
      params: {
        id: 1,
      },
    });
    const request2 = transformRequest({
      baseURL: 'https://www.xxx.com',
      method: 'get',
      url: 'https://www.yyy.com/test',
      params: {
        id: 1,
      },
    });

    expect(request.url).toEqual('https://www.xxx.com/test?id=1');
    expect(request2.url).toEqual('https://www.yyy.com/test?id=1');
  });
});
