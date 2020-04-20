/*
 * @Author: early-autumn
 * @Date: 2020-04-13 15:23:53
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-20 10:32:48
 */
/**
 * 任意值对象
 */
export declare type AnyObject = Record<string, any>;

/**
 * 请求方法
 */
export declare type AdapterMethod = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';

/**
 * 请求方法别名
 */
export declare type AliasMethod = 'options' | 'get' | 'head' | 'post' | 'put' | 'delete' | 'trace' | 'connect';

/**
 * Axios 请求方法
 */
export declare type Method = AliasMethod | AdapterMethod;

/**
 * Axios 参数
 */
export declare type Params = AnyObject;

/**
 * Axios 数据
 */
export declare type Data = string | AnyObject | ArrayBuffer;

/**
 * Axios 头
 */
export interface Headers {
  /**
   * 通用配置
   */
  common?: Record<string, string>;

  /**
   * options 请求专用
   */
  options?: Record<string, string>;

  /**
   * trace 请求专用
   */
  trace?: Record<string, string>;

  /**
   * connect 请求专用
   */
  connect?: Record<string, string>;

  /**
   * get 请求专用
   */
  get?: Record<string, string>;

  /**
   * head 请求专用
   */
  head?: Record<string, string>;

  /**
   * delete 请求专用
   */
  delete?: Record<string, string>;

  /**
   * post 请求专用
   */
  post?: Record<string, string>;

  /**
   * put 请求专用
   */
  put?: Record<string, string>;

  /**
   * 自定义配置
   */
  [x: string]: Record<string, string> | string | undefined;
}

/**
 * 通用请求配置
 */
export interface RequestConfig {
  /**
   * 接口地址
   */
  url: string;

  /**
   * HTTP 请求方法
   */
  method: AdapterMethod;

  /**
   * 请求数据
   */
  data: Data;

  /**
   * 请求头 同 headers
   */
  header: AnyObject;

  /**
   * 请求头 同 header
   */
  headers: AnyObject;

  /**
   * 返回的数据格式
   */
  dataType?: 'json' | '其他';

  /**
   * 响应的数据类型
   */
  responseType?: 'text' | 'arraybuffer';

  /**
   * 超时时间
   */
  timeout?: number;

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
   * 验证 ssl 证书
   */
  sslVerify?: boolean;
}

/**
 * 通用响应体
 */
export interface Response {
  /**
   * 响应状态码
   */
  statusCode?: number;

  /**
   * 响应状态码
   */
  status?: number;

  /**
   * 响应头 Headers
   */
  header?: AnyObject;

  /**
   * 响应头 Headers
   */
  headers: Headers;

  /**
   * 响应数据
   */
  data: Data;

  /**
   * 开发者服务器返回的 cookies，格式为字符串数组
   */
  cookies?: string[];

  /**
   * 网络请求过程中一些关键时间点的耗时信息
   */
  profile?: AnyObject;
}

/**
 * 适配器请求配置
 */
export interface AdapterRequestConfig extends RequestConfig {
  /**
   * 成功的响应函数
   */
  success: (res: Response) => void;

  /**
   * 失败的响应函数
   */
  fail: (err: unknown) => void;
}

/**
 * 适配器请求任务
 */
export interface AdapterRequestTask {
  /**
   * 取消请求
   */
  abort(): void;
}

/**
 * 适配器
 */
export interface Adapter {
  (config: AdapterRequestConfig): AdapterRequestTask;
}

/**
 * 平台
 */
export interface Platform {
  // 请求函数
  request?: Adapter;
  // 兼容支付宝小程序
  httpRequest?: Adapter;
}

/**
 * 转换数据函数
 */
export interface TransformData {
  (data: Data, headers: Headers): Data;
}

/**
 * Axios 请求配置
 */
export declare interface AxiosRequestConfig {
  /**
   * 自定义适配器
   */
  adapter?: Adapter;

  /**
   * 基础地址
   */
  baseURL?: string;

  /**
   * 请求地址
   */
  url?: string;

  /**
   * 请求方法
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
   * 请求头
   */
  headers?: Headers;

  /**
   * 自定义合法状态码
   */
  validateStatus?: (status: number) => boolean;

  /**
   * 自定义参数序列化
   */
  paramsSerializer?: (params?: AnyObject) => string;

  /**
   * 转换请求数据
   */
  transformRequest?: TransformData | TransformData[];

  /**
   * 转换响应数据
   */
  transformResponse?: TransformData | TransformData[];

  /**
   * 取消令牌
   */
  cancelToken?: CancelToken;

  /**
   * 超时时间
   */
  timeout?: number;

  /**
   * 响应数据格式
   */
  dataType?: 'json' | '其他';

  /**
   * 响应数据类型
   */
  responseType?: 'text' | 'arraybuffer';

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
   * 验证 ssl 证书
   */
  sslVerify?: boolean;
}

/**
 * Axios 响应体
 */
export interface AxiosResponse<T extends Data = Data> {
  /**
   * 状态码
   */
  status: number;

  /**
   * 状态文本
   */
  statusText: string;

  /**
   * 服务端返回的数据
   */
  data: T;

  /**
   * 响应头
   */
  headers: Headers;

  /**
   * Axios 请求配置
   */
  config: AxiosRequestConfig;

  /**
   * 开发者服务器返回的 cookies，格式为字符串数组
   */
  cookies?: string[];

  /**
   * 网络请求过程中一些关键时间点的耗时信息
   */
  profile?: AnyObject;
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
 * Axios 实例
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
   * 根据配置中的 url 和 params 生成一个 URI
   *
   * @param config 请求配置
   */
  getUri(config: AxiosRequestConfig): string;

  /**
   * 发送 HTTP 请求
   *
   * @param config 请求配置
   */
  request<T extends Data>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  /**
   * 发送 HTTP 请求 OPTIONS
   *
   * @param url    请求地址
   * @param config 额外配置
   */
  options<T extends Data>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  /**
   * 发送 HTTP 请求 GET
   *
   * @param url    请求地址
   * @param params 请求参数
   * @param config 额外配置
   */
  get<T extends Data>(url: string, params?: Params, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  /**
   * 发送 HTTP 请求 HEAD
   *
   * @param url    请求地址
   * @param params 请求参数
   * @param config 额外配置
   */
  head<T extends Data>(url: string, params?: Params, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  /**
   * 发送 HTTP 请求 POST
   *
   * @param url    请求地址
   * @param data   请求数据
   * @param config 额外配置
   */
  post<T extends Data>(url: string, data?: Data, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  /**
   * 发送 HTTP 请求 PUT
   *
   * @param url    请求地址
   * @param data   请求数据
   * @param config 额外配置
   */
  put<T extends Data>(url: string, data?: Data, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  /**
   * 发送 HTTP 请求 DELETE
   *
   * @param url    请求地址
   * @param params 请求参数
   * @param config 额外配置
   */
  delete<T extends Data>(url: string, params?: Params, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  /**
   * 发送 HTTP 请求 TRACE
   *
   * @param url    请求地址
   * @param config 额外配置
   */
  trace<T extends Data>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  /**
   * 发送 HTTP 请求 CONNECT
   *
   * @param url    请求地址
   * @param config 额外配置
   */
  connect<T extends Data>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
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
   * 通用请求配置
   */
  request: RequestConfig;

  /**
   * Axios 响应体
   */
  response?: AxiosResponse;
}

/**
 * 取消请求
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
 * 取消请求类接口
 */
export interface CancelConstructor {
  new (message?: string): Cancel;
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
   * 取消请求
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
   * 取消请求 CancelTokenSource.token
   */
  source(): CancelTokenSource;
}

/**
 * Axios 实例基础增强
 *
 * * 支持两种函数调用方式
 */
export interface AxiosBaseInstance extends Axios {
  /**
   * 调用方式一
   *
   * @param config 请求配置
   */
  <T extends Data>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;

  /**
   * 调用方式二
   *
   * @param url    请求地址
   * @param config 额外配置
   */
  <T extends Data>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}

/**
 * Axios 实例增强
 *
 * * 支持两种函数调用方式
 *
 * * 同时拓展了一些静态属性和方法
 */
export interface AxiosInstance extends AxiosBaseInstance {
  /**
   * 创建 Axios 实例基础增强
   *
   * @param config 全局配置
   */
  create(config?: AxiosRequestConfig): AxiosBaseInstance;

  /**
   * Axios 类
   */
  Axios: AxiosConstructor;

  /**
   * 取消令牌 类
   */
  CancelToken: CancelTokenConstructor;

  /**
   * 检查一个错误是不是取消错误
   *
   * @param value 判断的值
   */
  isCancel: (value: any) => boolean;
}
