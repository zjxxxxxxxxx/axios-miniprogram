/*
 * @Author: early-autumn
 * @Date: 2020-04-14 23:22:52
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-17 15:41:23
 */
import axios from './axios';

/**
 * 导出 typescript 类型
 */
export {
  AxiosMethod,
  AxiosRequestConfig,
  AxiosResponse,
  Axios,
  AxiosBaseInstance,
  AxiosInstance,
  AxiosError,
  CancelAction,
  CancelTokenSource,
  CancelToken,
} from './types';

/**
 * 导出 Axios 实例增强
 */
export default axios;
