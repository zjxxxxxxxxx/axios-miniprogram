/*
 * @Author: early-autumn
 * @Date: 2020-04-20 20:47:09
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-22 16:04:16
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

  it('interceptors 成功', () => {
    instance.defaults.adapter = function adapter({ data, success }): any {
      expect(data).toBe('interceptors_request');

      success({ data: 'data', headers: {} });

      return 'task';
    };

    instance.interceptors.request.use(function(config) {
      config.data = 'interceptors_request';
      return config;
    });

    instance.interceptors.response.use(function(response) {
      response.data = 'interceptors_response';
      return response;
    });

    instance
      .request({
        method: 'post',
        data: '',
      })
      .then(({ data }) => expect(data).toBe('interceptors_response'));
  });

  it('interceptors 失败', () => {
    instance.interceptors.response.use((response) => Promise.reject(response));

    instance
      .request({
        method: 'post',
        data: '',
      })
      .then(undefined, (error) => expect(error.data).toBe('interceptors_response'));

    instance.interceptors.request.use((config) => Promise.reject(config));

    instance
      .request({
        method: 'post',
        data: '',
      })
      .then(undefined, (error) => expect(error.method).toBe('post'));
  });
});
