/*
 * @Author: early-autumn
 * @Date: 2020-04-20 13:58:00
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-21 09:33:06
 */
import axios from '../src/axios';

describe('测试 src/axios.ts', () => {
  it('default', () => {
    axios('/test').then(undefined, (error) => {
      expect(error.isAxiosError).toBe(true);
      expect(error.message).toBe('平台适配失败，您需要参阅文档使用自定义适配器手动适配当前平台');
    });
  });

  it('axios call', async () => {
    axios.defaults.adapter = (config): any => {
      config.success({ status: 200, data: {}, headers: {} });

      expect(config.method).toBe(config.url.toUpperCase().replace('/', ''));

      return 'task';
    };

    await axios({ url: '/get' });
    await axios('/get');
    await axios.request({ url: '/get' });
    await axios.options('options');
    await axios.get('get');
    await axios.head('head');
    await axios.post('post');
    await axios.put('put');
    await axios.delete('delete');
    await axios.trace('trace');
    await axios.connect('connect');
  });

  it('axios 携带参数', async () => {
    const url = '/test';
    const params = {
      id: 1,
    };

    axios.defaults.adapter = (config): any => {
      config.success({ status: 200, data: {}, headers: {} });

      expect(config.method).toBe('GET');
      expect(config.url).toBe('/test?id=1');

      return 'task';
    };

    await axios({
      url,
      params,
    });
    await axios(url, {
      params,
    });
    await axios.get(url, params);
  });

  it('axios 携带数据', async () => {
    const url = '/test';
    const data = {
      id: 1,
    };
    axios.defaults.adapter = (config): any => {
      config.success({ status: 200, data: '', headers: {} });

      expect(config.method).toBe('POST');
      expect(config.url).toBe(url);
      expect(config.data).toEqual(data);

      return 'task';
    };

    await axios({
      method: 'post',
      url,
      data,
    });
    await axios(url, {
      method: 'post',
      data,
    });
    await axios.post(url, data);
  });

  it('axios.create 工厂方法', () => {
    const instance = axios.create();

    expect(instance.defaults).toEqual(axios.defaults);
  });
});
