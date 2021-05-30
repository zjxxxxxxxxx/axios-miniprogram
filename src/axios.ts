import { AxiosAdapter, createAdapter, AxiosPlatform } from './core/adapter';
import Axios, {
  AxiosConstructor,
  AxiosRequestConfig,
  AxiosResponse,
} from './core/Axios';
import { CancelToken, CancelTokenConstructor, isCancel } from './core/cancel';
import { mergeConfig } from './core/mergeConfig';
import { isString } from './helpers/is';
import defaults from './defaults';

export interface AxiosInstance extends Axios {
  <TData = any>(config: AxiosRequestConfig): Promise<AxiosResponse<TData>>;
  <TData = any>(url: string, config?: AxiosRequestConfig): Promise<
    AxiosResponse<TData>
  >;
}

export interface AxiosStatic extends AxiosInstance {
  Axios: AxiosConstructor;
  CancelToken: CancelTokenConstructor;
  create(defaults?: AxiosRequestConfig): AxiosInstance;
  createAdapter(platform: AxiosPlatform): AxiosAdapter;
  isCancel(value: any): boolean;
}

function createInstance(defaults: AxiosRequestConfig): AxiosInstance {
  const instance = new Axios(defaults);

  function axios<TData = any>(
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

export default axios;
