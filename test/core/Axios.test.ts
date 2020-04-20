/*
 * @Author: early-autumn
 * @Date: 2020-04-20 20:47:09
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-20 22:17:18
 */
import Axios from '../../src/core/Axios';

const instance = new Axios();

describe('测试 src/core/Axios.ts', () => {
  it('defaults', () => {
    expect(instance.defaults).toEqual({});
  });

  it('getUri', () => {
    expect(instance.getUri({})).toEqual('');
    expect(instance.getUri({ url: '/test' })).toEqual('/test');
    expect(instance.getUri({ url: '', params: { id: 1 } })).toEqual('id=1');
    expect(instance.getUri({ url: '/test', params: { id: 1 } })).toEqual('/test?id=1');
  });

  it('interceptors 成功', async () => {
    instance.defaults.adapter = function adapter({ data, success }) {
      expect(data).toBe('interceptors_request');

      success({ data: 'data', headers: {} });

      return { abort: jest.fn() };
    };

    instance.interceptors.request.use(function(config) {
      config.data = 'interceptors_request';
      return config;
    });

    instance.interceptors.response.use(function(response) {
      response.data = 'interceptors_response';
      return response;
    });

    await instance
      .request({
        method: 'post',
        data: '',
      })
      .then(({ data }) => expect(data).toBe('interceptors_response'));
  });

  it('interceptors 失败', async () => {
    instance.interceptors.response.use(function(response) {
      throw response;
    });

    await instance
      .request({
        method: 'post',
        data: '',
      })
      .catch((error) => expect(error.data).toBe('interceptors_response'));

    instance.interceptors.request.use(function(config) {
      throw config;
    });

    await instance
      .request({
        method: 'post',
        data: '',
      })
      .catch((error) => expect(error.method).toBe('post'));
  });
});
