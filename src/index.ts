import axios from './axios';

export type {
  AxiosRequestConfig,
  AxiosRequestData,
  AxiosRequestFormData,
  AxiosResponse,
  AxiosResponseData,
  AxiosResponseError,
} from './core/Axios';
export type {
  AxiosAdapterRequestConfig,
  AxiosAdapterResponse,
  AxiosAdapterResponseData,
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
