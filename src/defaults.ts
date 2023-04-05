import { getAdapterDefault } from './adapter';
import { AxiosInstanceDefaults } from './axios';

const defaults: AxiosInstanceDefaults = {
  adapter: getAdapterDefault(),
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
    },
    options: {},
    get: {},
    head: {},
    post: {},
    put: {},
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
};

export default defaults;
