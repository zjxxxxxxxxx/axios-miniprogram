import transformRequest from '../../src/core/transformRequest';

describe('测试 src/core/transformRequest.ts', () => {
  it('默认', () => {
    expect(transformRequest({})).toEqual({
      url: '/',
      method: 'GET',
      headers: void 0,
      data: void 0,
      dataType: void 0,
      enableCache: void 0,
      enableHttp2: void 0,
      enableQuic: void 0,
      header: void 0,
      responseType: void 0,
      sslVerify: void 0,
      timeout: void 0,
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
