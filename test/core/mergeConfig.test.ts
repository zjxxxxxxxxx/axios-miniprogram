import { AxiosRequestConfig } from '../../src/types';
import mergeConfig from '../../src/core/mergeConfig';
import defaults from '../../src/defaults';

describe('测试 src/core/mergeConfig.ts', () => {
  it('默认', () => {
    expect(mergeConfig()).toEqual({});

    expect(mergeConfig({ baseURL: 'https://www.xxx.com' })).toEqual({ baseURL: 'https://www.xxx.com' });

    expect(mergeConfig(void 0, { baseURL: 'https://www.xxx.com' })).toEqual({ baseURL: 'https://www.xxx.com' });
  });

  it('只取 config2', () => {
    const config2 = { url: 'https://www.config2.com', data: { config2: 0 } };
    const config = mergeConfig(defaults, config2);

    expect(config.url).toEqual(config2.url);
    expect(config.data).toEqual(config2.data);
  });

  it('优先取 config2', () => {
    expect(mergeConfig(defaults, {})).toEqual(defaults);

    const config2: AxiosRequestConfig = {
      baseURL: 'https://www.config2.com',
      method: 'post',
      timeout: 10000,
    };

    const config = mergeConfig(defaults, config2);

    expect(config.baseURL).toEqual(config2.baseURL);
    expect(config.method).toEqual(config2.method);
    expect(config.timeout).toEqual(config2.timeout);
  });

  it('深度合并', () => {
    const config1 = { params: { config1: 0 }, headers: { Config1: '0' } };
    const config2 = { params: { config2: 0 }, headers: { Config2: '0' } };

    expect(mergeConfig(config1, {})).toEqual(config1);

    expect(mergeConfig(config1, config2)).toEqual({
      params: { config1: 0, config2: 0 },
      headers: { Config1: '0', Config2: '0' },
    });

    expect(mergeConfig({ params: {} }, { params: { config: 'config2' } })).toEqual({
      params: { config: 'config2' },
    });

    expect(mergeConfig({ params: { config: 'config1' } }, {})).toEqual({
      params: { config: 'config1' },
    });
  });
});
