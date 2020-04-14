/*
 * @Author: early-autumn
 * @Date: 2020-04-13 18:00:27
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-14 23:40:52
 */
import { Params, Data, AxiosRequestConfig, Axios, AxiosMethodConfig, AxiosPromise, Method } from '../types';
import dispatchRequest from './dispatchRequest';

export default class AxiosStatic implements Axios {
  request(config: AxiosRequestConfig): AxiosPromise {
    return dispatchRequest(config);
  }

  options(url: string, params?: Params, config?: AxiosMethodConfig): AxiosPromise {
    return this._requestMethodWithoutParams('options', url, params, config);
  }

  get(url: string, params?: Params, config?: AxiosMethodConfig): AxiosPromise {
    return this._requestMethodWithoutParams('get', url, params, config);
  }

  head(url: string, params?: Params, config?: AxiosMethodConfig): AxiosPromise {
    return this._requestMethodWithoutParams('head', url, params, config);
  }

  post(url: string, data?: Data, config?: AxiosMethodConfig): AxiosPromise {
    return this._requestMethodWithoutData('post', url, data, config);
  }

  put(url: string, data?: Data, config?: AxiosMethodConfig): AxiosPromise {
    return this._requestMethodWithoutData('put', url, data, config);
  }

  delete(url: string, params?: Params, config?: AxiosMethodConfig): AxiosPromise {
    return this._requestMethodWithoutParams('delete', url, params, config);
  }

  trace(url: string, params?: Params, config?: AxiosMethodConfig): AxiosPromise {
    return this._requestMethodWithoutParams('trace', url, params, config);
  }

  connect(url: string, params?: Params, config?: AxiosMethodConfig): AxiosPromise {
    return this._requestMethodWithoutParams('connect', url, params, config);
  }

  _requestMethodWithoutParams(method: Method, url: string, params?: Params, config: AxiosMethodConfig = {}) {
    return this.request({ ...config, method, url, params });
  }

  _requestMethodWithoutData(method: Method, url: string, data?: Data, config: AxiosMethodConfig = {}) {
    return this.request({ ...config, method, url, data });
  }
}
