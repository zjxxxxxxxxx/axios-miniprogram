import { getAdapterDefault } from './core/adapter';
import { AxiosRequestConfig } from './core/Axios';

const defaults: AxiosRequestConfig = {
  adapter: getAdapterDefault(),
  headers: {
    common: {
      Accept: 'application/json, test/plain, */*',
    },
    options: {},
    get: {},
    head: {},
    post: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    put: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    delete: {},
    trace: {},
    connect: {},
  },
  validateStatus(status: number): boolean {
    return status >= 200 && status < 300;
  },
  timeout: 10000,
  dataType: 'json',
  responseType: 'text',
  enableHttp2: false,
  enableQuic: false,
  enableCache: false,
  sslVerify: true,
};

export default defaults;
