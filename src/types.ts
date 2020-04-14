/*
 * @Author: early-autumn
 * @Date: 2020-04-13 15:23:53
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-14 23:42:10
 */
import 'miniprogram-api-typings';

export declare type AnyObject = Record<string, any>;

export declare type Params = AnyObject;

export declare type Data = AxiosRequestConfig['data'];

/**
 * 请求方法
 */
export declare type Method =
  | 'options'
  | 'get'
  | 'head'
  | 'post'
  | 'put'
  | 'delete'
  | 'trace'
  | 'connect'
  | WechatMiniprogram.RequestOption['method'];

/**
 * 请求体
 */
export type AxiosRequestConfig = Omit<WechatMiniprogram.RequestOption, 'method' | 'success' | 'fail' | 'complete'> & {
  /** HTTP 请求方法
   *
   * 可选值：
   * - 'options': HTTP 请求 OPTIONS;
   * - 'OPTIONS': HTTP 请求 OPTIONS;
   * - 'get': HTTP 请求 GET;
   * - 'GET': HTTP 请求 GET;
   * - 'head': HTTP 请求 HEAD;
   * - 'HEAD': HTTP 请求 HEAD;
   * - 'post': HTTP 请求 POST;
   * - 'POST': HTTP 请求 POST;
   * - 'put': HTTP 请求 PUT;
   * - 'PUT': HTTP 请求 PUT;
   * - 'delete': HTTP 请求 DELETE;
   * - 'DELETE': HTTP 请求 DELETE;
   * - 'trace': HTTP 请求 TRACE;
   * - 'TRACE': HTTP 请求 TRACE;
   * - 'connect': HTTP 请求 CONNECT;
   * - 'CONNECT': HTTP 请求 CONNECT;
   */
  method?: Method;
  /**
   * URL 参数
   */
  params?: Params;
  /**
   * 开启 http2
   */
  enableHttp2?: boolean;
  /**
   * 开启 quic
   */
  enableQuic?: boolean;
  /**
   * 开启 cache
   */
  enableCache?: boolean;
  /**
   * 取消令牌
   */
  cancelToken?: CancelToken;
};

/**
 * 响应体
 */
export interface AxiosResponse extends WechatMiniprogram.RequestSuccessCallbackResult {
  config: AxiosRequestConfig;
}

export declare type AxiosPromise = Promise<AxiosResponse>;

export type AxiosMethodConfig = Omit<AxiosRequestConfig, 'url'>;

/**
 * Axios 对象
 */
export interface Axios {
  /**
   *
   * @param config 000
   */
  request(config: AxiosRequestConfig): AxiosPromise;

  options(url: string, params?: Params, config?: AxiosMethodConfig): AxiosPromise;

  get(url: string, params?: Params, config?: AxiosMethodConfig): AxiosPromise;

  head(url: string, params?: Params, config?: AxiosMethodConfig): AxiosPromise;

  post(url: string, data?: Data, config?: AxiosMethodConfig): AxiosPromise;

  put(url: string, data?: Data, config?: AxiosMethodConfig): AxiosPromise;

  delete(url: string, params?: Params, config?: AxiosMethodConfig): AxiosPromise;

  trace(url: string, params?: Data, config?: AxiosMethodConfig): AxiosPromise;

  connect(url: string, params?: Data, config?: AxiosMethodConfig): AxiosPromise;
}

export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise;
}

// export interface AxiosError extends Error {
//   isAxiosError: boolean;
//   config: AxiosRequestConfig;
//   response?: AxiosResponse;
// }

/**
 * 取消对象
 */
export interface Cancel {
  /**
   * 取消原因
   */
  message?: string;
  /**
   * 序列化
   */
  toString(): string;
}

/**
 * 取消操作
 */
export interface CancelAction {
  (message?: string): void;
}

/**
 * 取消操作执行器
 */
export interface CancelExecutor {
  (cancel: CancelAction): void;
}

/**
 * 取消令牌
 */
export interface CancelToken {
  /**
   * 取消对象
   */
  reason?: Cancel;
  /**
   * 取消时触发
   */
  listener: Promise<Cancel>;
  /**
   * 如果已取消 则抛出取消对象
   */
  throwIfRequested(): void;
}

/**
 * 取消令牌 source
 */
export interface CancelTokenSource {
  token: CancelToken;
  cancel: CancelAction;
}
