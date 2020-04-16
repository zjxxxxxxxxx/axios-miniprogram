/*
 * @Author: early-autumn
 * @Date: 2020-04-13 15:23:53
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-17 00:06:34
 */
import 'miniprogram-api-typings';

/**
 * 任意值对象
 */
export declare type AnyObject = Record<string, any>;

/**
 * 微信小程序请求方法
 */
export declare type MethodType = WechatMiniprogram.RequestOption['method'];

/**
 * Axios 请求方法
 */
export declare type Method = 'options' | 'get' | 'head' | 'post' | 'put' | 'delete' | 'trace' | 'connect' | MethodType;

/**
 * Axios 请求参数
 */
export declare type Params = AnyObject;

/**
 * Axios 请求数据
 */
export declare type Data = WechatMiniprogram.RequestOption['data'];

/**
 * Axios 请求头
 */
export interface Headers {
  /**
   * 通用配置
   */
  common?: Record<string, string>;

  /**
   * options 配置
   */
  options?: Record<string, string>;

  /**
   * get 配置
   */
  get?: Record<string, string>;

  /**
   * head 配置
   */
  head?: Record<string, string>;

  /**
   * post 配置
   */
  post?: Record<string, string>;

  /**
   * put 配置
   */
  put?: Record<string, string>;

  /**
   * delete 配置
   */
  delete?: Record<string, string>;

  /**
   * trace 配置
   */
  trace?: Record<string, string>;

  /**
   * connect 配置
   */
  connect?: Record<string, string>;

  /**
   * 自定义配置
   */
  [x: string]: string | Record<string, string> | undefined;
}

export interface TransformData {
  (data: Data, headers?: Headers): Data;
}

/**
 * 请求配置
 */
export declare interface AxiosRequestConfig
  extends Pick<WechatMiniprogram.RequestOption, 'dataType' | 'responseType' | 'timeout'> {
  /**
   * 基础地址
   */
  baseURL?: string;

  /**
   * 开发者服务器接口地址
   */
  url?: string;

  /** HTTP 请求方法
   *
   * 可选值：
   * - 'options': HTTP 请求 OPTIONS;
   * - 'get':     HTTP 请求 GET;
   * - 'head':    HTTP 请求 HEAD;
   * - 'post':    HTTP 请求 POST;
   * - 'put':     HTTP 请求 PUT;
   * - 'delete':  HTTP 请求 DELETE;
   * - 'trace':   HTTP 请求 TRACE;
   * - 'connect': HTTP 请求 CONNECT;
   * - 'OPTIONS': HTTP 请求 OPTIONS;
   * - 'GET':     HTTP 请求 GET;
   * - 'HEAD':    HTTP 请求 HEAD;
   * - 'POST':    HTTP 请求 POST;
   * - 'PUT':     HTTP 请求 PUT;
   * - 'DELETE':  HTTP 请求 DELETE;
   * - 'TRACE':   HTTP 请求 TRACE;
   * - 'CONNECT': HTTP 请求 CONNECT;
   */
  method?: Method;

  /**
   * 请求参数
   */
  params?: Params;

  /**
   * 请求数据
   */
  data?: Data;

  /**
   * 请求头配置
   */
  headers?: Headers;

  /**
   * 转换请求数据
   */
  transformRequest?: TransformData | TransformData[];

  /**
   * 转换响应数据
   */
  transformResponse?: TransformData | TransformData[];

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

  /**
   * 自定义合法状态码
   */
  validateStatus?: (status: number) => boolean;

  /**
   * 自定义参数序列化
   */
  paramsSerializer?: (params: AnyObject) => string;
}

/**
 * 服务端响应数据
 */
export declare type ResponseData = WechatMiniprogram.RequestSuccessCallbackResult['data'];

/**
 * 请求响应体
 */
export interface AxiosResponse<T extends ResponseData = ResponseData>
  extends Omit<WechatMiniprogram.RequestSuccessCallbackResult, 'header'> {
  /**
   * 开发者服务器返回的数据
   */
  data: T;

  /**
   * 开发者服务器返回的 HTTP Response Headers
   */
  headers: Headers;

  /**
   * 请求配置
   */
  config: AxiosRequestConfig;
}

/**
 * 拦截器成功的回调函数
 */
export interface InterceptorResolved<T = any> {
  (value: T): Promise<T>;
}

/**
 * 拦截器失败的回调函数
 */
export interface InterceptorRejected {
  (err: any): any;
}

/**
 * 拦截器
 */
export interface Interceptor<T = any> {
  /**
   * 拦截器成功的回调函数
   */
  resolved: InterceptorResolved<T>;
  /**
   * 拦截器失败的回调函数
   */
  rejected: InterceptorRejected;
}

/**
 * 拦截器执行器
 */
export interface InterceptorExecutor<T = any> {
  (interceptor: Interceptor<T>): void;
}

/**
 * 拦截器管理器
 */
export interface InterceptorManager<T = any> {
  /**
   * 添加拦截器
   *
   * @param resolved 成功的回调函数
   * @param rejected 失败的回调函数
   */
  use(resolved: InterceptorResolved<T>, rejected?: InterceptorRejected): number;

  /**
   * 删除拦截器
   *
   * @param id 拦截器 id
   */
  eject(id: number): void;

  /**
   * 遍历所有拦截器
   *
   * @param executor 拦截器执行器
   * @param reverse  是否倒序遍历
   */
  forEach(executor: InterceptorExecutor<T>, reverse?: 'reverse'): void;
}

/**
 * Axios 拦截器
 */
export interface Interceptors {
  /**
   * request 请求前置拦截器
   */
  request: InterceptorManager<AxiosRequestConfig>;

  /**
   * response 请求后置拦截器
   */
  response: InterceptorManager<AxiosResponse>;
}
/**
 * Axios
 */
export interface Axios {
  /**
   * 默认配置
   */
  defaults: AxiosRequestConfig;

  /**
   * Axios 拦截器
   */
  interceptors: Interceptors;

  /**
   * baseURL + url + params 得到完整请求地址
   *
   * @param config 请求配置
   */
  getUri(config: AxiosRequestConfig): string;

  /**
   * 发送 HTTP 请求
   *
   * @param config 请求配置
   */
  request<T extends ResponseData>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  /**
   * 发送 HTTP 请求 OPTIONS
   *
   * @param url    请求地址
   * @param params 请求参数
   * @param config 额外配置
   */
  options<T extends ResponseData>(url: string, params?: Params, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  /**
   * 发送 HTTP 请求 GET
   *
   * @param url    请求地址
   * @param params 请求参数
   * @param config 额外配置
   */
  get<T extends ResponseData>(url: string, params?: Params, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  /**
   * 发送 HTTP 请求 HEAD
   *
   * @param url    请求地址
   * @param params 请求参数
   * @param config 额外配置
   */
  head<T extends ResponseData>(url: string, params?: Params, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  /**
   * 发送 HTTP 请求 POST
   *
   * @param url    请求地址
   * @param data   请求数据
   * @param config 额外配置
   */
  post<T extends ResponseData>(url: string, data?: Data, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  /**
   * 发送 HTTP 请求 PUT
   *
   * @param url    请求地址
   * @param data   请求数据
   * @param config 额外配置
   */
  put<T extends ResponseData>(url: string, data?: Data, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  /**
   * 发送 HTTP 请求 DELETE
   *
   * @param url    请求地址
   * @param params 请求参数
   * @param config 额外配置
   */
  delete<T extends ResponseData>(url: string, params?: Params, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  /**
   * 发送 HTTP 请求 TRACE
   *
   * @param url    请求地址
   * @param params 请求参数
   * @param config 额外配置
   */
  trace<T extends ResponseData>(url: string, params?: Data, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  /**
   * 发送 HTTP 请求 CONNECT
   *
   * @param url    请求地址
   * @param params 请求参数
   * @param config 额外配置
   */
  connect<T extends ResponseData>(url: string, params?: Data, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}

/**
 * Axios 类接口
 */
export interface AxiosConstructor {
  new (config: AxiosRequestConfig): Axios;
}

/**
 * AxiosError 类继承自 Error
 */
export interface AxiosError extends Error {
  /**
   * 是 Axios 错误
   */
  isAxiosError: boolean;

  /**
   * 请求配置
   */
  config: AxiosRequestConfig;

  /**
   * 请求响应体
   */
  response?: AxiosResponse;
}

/**
 * 取消对象
 */
export interface Cancel {
  /**
   * 取消信息
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
   * 取消时被触发
   */
  listener: Promise<Cancel>;

  /**
   * 如果已经取消, 则抛出取消对象
   */
  throwIfRequested(): void;
}

/**
 * 取消令牌类接口
 */

export interface CancelTokenConstructor {
  new (executor: CancelExecutor): CancelToken;
  /**
   * 返回一个 CancelTokenSource
   *
   * CancelTokenSource.token 是一个 CancelToken 对象
   *
   * CancelTokenSource.cancel 是一个 CancelAction 函数
   *
   * 调用 CancelTokenSource.cancel('这里可以填写您的错误信息')
   *
   * 取消 CancelTokenSource.token
   */
  source(): CancelTokenSource;
}

/**
 * 取消令牌 source
 */
export interface CancelTokenSource {
  /**
   * 取消令牌
   */
  token: CancelToken;

  /**
   * 取消操作
   */
  cancel: CancelAction;
}

/**
 * axios 增强函数
 *
 * 支持两种调用方式, 并含有 Axios 实例的所有属性和方法
 */
export interface AxiosInstance extends Axios {
  /**
   * 调用方式一
   *
   * @param config 请求配置
   */
  <T extends ResponseData>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  /**
   * 调用方式二
   *
   * @param url    请求地址
   * @param config 额外配置
   */
  <T extends ResponseData>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  /**
   * Axios 类
   */
  Axios: AxiosConstructor;

  /**
   * 创建 Axios 实例
   *
   * @param config 全局配置
   */
  create(config: AxiosRequestConfig): Axios;

  /**
   * Cancel 类
   */
  Cancel: Cancel;

  /**
   * CancelToken 类
   */
  CancelToken: CancelTokenConstructor;

  /**
   * 是不是一个取消对象
   *
   * @param value 判断的值
   */
  isCancel: (value: any) => boolean;
}
