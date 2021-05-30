import { AxiosAdapter, AxiosPlatform } from './core/adapter';
import Axios, {
  AxiosConstructor,
  AxiosRequestConfig,
  AxiosResponse,
} from './core/Axios';
import { CancelTokenConstructor } from './core/cancel';
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
declare const axios: AxiosStatic;
export default axios;
