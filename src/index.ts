import axios from './axios';

export type {
  AxiosRequestConfig,
  AxiosRequestFormData,
  AxiosResponse,
  AxiosResponseError,
} from './core/Axios';
export type {
  AxiosAdapterRequestConfig,
  AxiosAdapterResponse,
  AxiosAdapterResponseError,
  AxiosAdapter,
  AxiosPlatform,
} from './adapter';
export type {
  AxiosInstanceDefaults,
  AxiosInstance,
  AxiosStatic,
} from './axios';
export default axios;
