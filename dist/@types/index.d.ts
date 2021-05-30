import axios from './axios';
export {
  AxiosRequestConfig,
  AxiosRequestFormData,
  AxiosResponse,
  AxiosResponseError,
} from './core/Axios';
export {
  AxiosAdapterRequestConfig,
  AxiosAdapter,
  AxiosPlatform,
} from './core/adapter';
export { AxiosInstance, AxiosStatic } from './axios';
export default axios;
