import axios from './axios';

export type {
  AxiosRequestConfig,
  AxiosRequestFormData,
  AxiosResponse,
  AxiosResponseError,
} from './core/Axios';
export type {
  AxiosAdapterRequestConfig,
  AxiosAdapter,
  AxiosPlatform,
} from './core/adapter';
export type { AxiosInstance, AxiosStatic } from './axios';
export default axios;
