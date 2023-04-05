import { isString } from './helpers/isTypes';
import Axios, {
  AxiosConstructor,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from './core/Axios';
import { CancelToken, CancelTokenConstructor, isCancel } from './core/cancel';
import { isAxiosError } from './core/createError';
import { mergeConfig } from './core/mergeConfig';
import { AxiosAdapter, createAdapter, AxiosPlatform } from './adapter';
import defaults from './defaults';

export interface AxiosInstanceDefaults extends AxiosRequestHeaders {
  headers: Required<AxiosRequestHeaders>;
}

export interface AxiosInstance extends Axios {
  defaults: AxiosInstanceDefaults;
  <TData = unknown>(config: AxiosRequestConfig): Promise<AxiosResponse<TData>>;
  <TData = unknown>(url: string, config?: AxiosRequestConfig): Promise<
    AxiosResponse<TData>
  >;
}

export interface AxiosStatic extends AxiosInstance {
  Axios: AxiosConstructor;
  CancelToken: CancelTokenConstructor;
  create(defaults?: AxiosRequestConfig): AxiosInstance;
  createAdapter(platform: AxiosPlatform): AxiosAdapter;
  isCancel: typeof isCancel;
  isAxiosError: typeof isAxiosError;
}

function createInstance(defaults: AxiosRequestConfig): AxiosInstance {
  const instance = new Axios(defaults);

  function axios<TData = unknown>(
    url: AxiosRequestConfig | string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>> {
    if (isString(url)) {
      config = Object.assign({}, config, { url });
    } else {
      config = url;
    }

    return instance.request(config);
  }

  Object.assign(axios, instance);
  Object.setPrototypeOf(axios, Object.getPrototypeOf(instance));

  return axios as AxiosInstance;
}

const axios = createInstance(defaults) as AxiosStatic;

axios.Axios = Axios;
axios.CancelToken = CancelToken;
axios.create = function create(defaults: AxiosRequestConfig): AxiosInstance {
  return createInstance(mergeConfig(axios.defaults, defaults));
};
axios.createAdapter = createAdapter;
axios.isCancel = isCancel;
axios.isAxiosError = isAxiosError;

export default axios;
