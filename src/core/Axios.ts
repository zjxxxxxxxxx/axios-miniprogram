import {
  PLAIN_METHODS,
  WITH_DATA_METHODS,
  WITH_PARAMS_METHODS,
} from '../constants/methods';
import { isString } from '../helpers/types';
import { dispatchRequest } from '../request/dispatchRequest';
import { CancelToken } from '../request/cancel';
import { AxiosTransformer } from '../request/transformData';
import { deepMerge } from '../helpers/deepMerge';
import {
  AxiosAdapter,
  AxiosAdapterRequestMethod,
  AxiosAdapterPlatformTask,
  AxiosAdapterRequestConfig,
  AxiosAdapterResponseData,
} from '../adpater/createAdapter';
import InterceptorManager, {
  Interceptor,
  InterceptorExecutor,
} from './InterceptorManager';
import MiddlewareManager, {
  MiddlewareCallback,
  MiddlewareContext,
} from './MiddlewareManager';
import { mergeConfig } from './mergeConfig';

/**
 * 请求方法
 */
export type AxiosRequestMethod =
  | AxiosAdapterRequestMethod
  | 'options'
  | 'get'
  | 'head'
  | 'post'
  | 'put'
  | 'patch'
  | 'delete'
  | 'trace'
  | 'connect';

/**
 * 请求头
 */
export interface AxiosRequestHeaders extends AnyObject {
  /**
   * 通用请求头
   */
  common?: AnyObject;
  /**
   * options 请求头
   */
  options?: AnyObject;
  /**
   * get 请求头
   */
  get?: AnyObject;
  /**
   * head 请求头
   */
  head?: AnyObject;
  /**
   * post 请求头
   */
  post?: AnyObject;
  /**
   * put 请求头
   */
  put?: AnyObject;
  /**
   * delete 请求头
   */
  delete?: AnyObject;
  /**
   * trace 请求头
   */
  trace?: AnyObject;
  /**
   * connect 请求头
   */
  connect?: AnyObject;
}

/**
 * 表单数据（上传会用到）
 */
export interface AxiosRequestFormData extends AnyObject {
  /**
   * 文件名
   */
  name: string;
  /**
   * 文件路径
   */
  filePath: string;
}

/**
 * 请求数据
 */
export type AxiosRequestData =
  | string
  | AnyObject
  | ArrayBuffer
  | AxiosRequestFormData;

/**
 * 响应数据
 */
export type AxiosResponseData = number | AxiosAdapterResponseData;

/**
 * 进度对象
 */
export interface AxiosProgressEvent extends AnyObject {
  /**
   * 上传进度百分比
   */
  progress: number;
}

/**
 * 下载进度对象
 */
export interface AxiosDownloadProgressEvent extends AxiosProgressEvent {
  /**
   * 已经下载的数据长度，单位 Bytes
   */
  totalBytesWritten: number;
  /**
   * 预预期需要下载的数据总长度，单位 Bytes
   */
  totalBytesExpectedToWrite: number;
}

/**
 * 监听下载进度
 */
export interface AxiosDownloadProgressCallback {
  (event: AxiosDownloadProgressEvent): void;
}

/**
 * 上传进度对象
 */
export interface AxiosUploadProgressEvent extends AxiosProgressEvent {
  /**
   * 已经上传的数据长度，单位 Bytes
   */
  totalBytesSent: number;
  /**
   * 预期需要上传的数据总长度，单位 Bytes
   */
  totalBytesExpectedToSend: number;
}

/**
 * 监听上传进度
 */
export interface AxiosUploadProgressCallback {
  (event: AxiosUploadProgressEvent): void;
}

/**
 * 请求配置
 */
export interface AxiosRequestConfig
  extends Partial<
    Omit<AxiosAdapterRequestConfig, 'type' | 'success' | 'fail'>
  > {
  /**
   * 请求适配器
   */
  adapter?: AxiosAdapter;
  /**
   * 基础路径
   */
  baseURL?: string;
  /**
   * 请求的 URL
   */
  url?: string;
  /**
   * 请求参数
   */
  params?: AnyObject;
  /**
   * 请求数据
   */
  data?: AxiosRequestData;
  /**
   * 请求头
   */
  headers?: AxiosRequestHeaders;
  /**
   * 请求方法
   */
  method?: AxiosRequestMethod;
  /**
   * 取消令牌
   */
  cancelToken?: CancelToken;
  /**
   * 下载文件
   */
  download?: boolean;
  /**
   * 上传文件
   */
  upload?: boolean;
  /**
   * 请求参数系列化函数
   */
  paramsSerializer?: (params?: AnyObject) => string;
  /**
   * 校验状态码
   */
  validateStatus?: (status: number) => boolean;
  /**
   * 转换请求数据
   */
  transformRequest?: AxiosTransformer<AxiosRequestData>;
  /**
   * 转换响应数据
   */
  transformResponse?: AxiosTransformer<AxiosResponseData>;
  /**
   * 错误处理
   */
  errorHandler?: (error: unknown) => Promise<AxiosResponse>;
  /**
   * 监听下载进度
   */
  onDownloadProgress?: AxiosUploadProgressCallback;
  /**
   * 监听上传进度
   */
  onUploadProgress?: AxiosUploadProgressCallback;
}

/**
 * 响应体
 */
export interface AxiosResponse<
  TData extends AxiosResponseData = AxiosResponseData,
> extends AnyObject {
  /**
   * 状态码
   */
  status: number;
  /**
   * 状态字符
   */
  statusText: string;
  /**
   * 响应头
   */
  headers: AnyObject;
  /**
   * 响应数据
   */
  data: TData;
  /**
   * 请求配置
   */
  config: AxiosRequestConfig;
  /**
   * 请求任务
   */
  request?: AxiosAdapterPlatformTask;
}

/**
 * 错误体
 */
export interface AxiosResponseError extends AnyObject {
  /**
   * 状态码
   */
  status: number;
  /**
   * 状态字符
   */
  statusText: string;
  /**
   * 响应头
   */
  headers: AnyObject;
  /**
   * 错误数据
   */
  data: AnyObject;
  /**
   * 失败的请求，指没能够成功响应的请求
   */
  isFail: true;
  /**
   * 请求配置
   */
  config: AxiosRequestConfig;
  /**
   * 请求任务
   */
  request?: AxiosAdapterPlatformTask;
}

export interface AxiosRequest {
  <TData extends AxiosResponseData>(config: AxiosRequestConfig): Promise<
    AxiosResponse<TData>
  >;
  <TData extends AxiosResponseData>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<TData>>;
}

/**
 * 普通的请求方法
 */
export type AxiosRequestMethodFn = <TData extends AxiosResponseData>(
  url: string,
  config?: AxiosRequestConfig,
) => Promise<AxiosResponse<TData>>;

/**
 * 带参数的请求方法
 */
export type AxiosRequestMethodFnWithParams = <TData extends AxiosResponseData>(
  url: string,
  params?: AnyObject,
  config?: AxiosRequestConfig,
) => Promise<AxiosResponse<TData>>;

/**
 * 带数据的请求方法
 */
export type AxiosRequestMethodFnWithData = <TData extends AxiosResponseData>(
  url: string,
  data?: AxiosRequestData,
  config?: AxiosRequestConfig,
) => Promise<AxiosResponse<TData>>;

export interface AxiosDomainRequestHandler {
  (config: AxiosRequestConfig): Promise<AxiosResponse>;
}

/**
 * Axios 构造函数
 */
export interface AxiosConstructor {
  new (config: AxiosRequestConfig): Axios;
}

export default class Axios {
  /**
   * @internal
   *
   * 父级实例
   */
  private declare parent?: Axios;

  /**
   * 默认请求配置
   */
  declare defaults: AxiosRequestConfig;

  /**
   * 拦截器
   */
  interceptors = {
    /**
     * 请求拦截器
     */
    request: new InterceptorManager<AxiosRequestConfig>(),
    /**
     * 响应拦截器
     */
    response: new InterceptorManager<AxiosResponse>(),
  };

  /**
   * @internal
   *
   * 中间件
   */
  private middleware = new MiddlewareManager();

  /**
   * 发送 options 请求
   */
  declare options: AxiosRequestMethodFn;

  /**
   * 发送 get 请求
   */
  declare get: AxiosRequestMethodFnWithParams;

  /**
   * 发送 head 请求
   */
  declare head: AxiosRequestMethodFnWithParams;

  /**
   * 发送 post 请求
   */
  declare post: AxiosRequestMethodFnWithData;

  /**
   * 发送 put 请求
   */
  declare put: AxiosRequestMethodFnWithData;

  /**
   * 发送 patch 请求
   */
  declare patch: AxiosRequestMethodFnWithData;

  /**
   * 发送 delete 请求
   */
  declare delete: AxiosRequestMethodFnWithParams;

  /**
   * 发送 trace 请求
   */
  declare trace: AxiosRequestMethodFn;

  /**
   * 发送 connect 请求
   */
  declare connect: AxiosRequestMethodFn;

  /**
   * @param config 默认配置
   * @param parent 父级实例
   */
  constructor(config: AxiosRequestConfig, parent?: Axios) {
    this.defaults = config;
    this.parent = parent;
  }

  /**
   * 发送请求
   */
  request: AxiosRequest = (
    urlOrConfig: string | AxiosRequestConfig,
    config: AxiosRequestConfig = {},
  ) => {
    if (isString(urlOrConfig)) {
      config.url = urlOrConfig;
    } else {
      config = urlOrConfig;
    }
    config = mergeConfig(this.defaults, config);
    config.method = (config.method?.toLowerCase() ??
      'get') as AxiosRequestMethod;

    const requestHandler = {
      resolved: this.handleRequest,
    };
    const errorHandler = {
      rejected: config.errorHandler,
    };
    const chain: (
      | Partial<Interceptor<AxiosRequestConfig>>
      | Partial<Interceptor<AxiosResponse>>
    )[] = [];

    this.eachInterceptors('request', (interceptor) => {
      chain.unshift(interceptor);
    });
    chain.push(requestHandler);
    this.eachInterceptors('response', (interceptor) => {
      chain.push(interceptor);
    });
    chain.push(errorHandler);

    return chain.reduce(
      (next, { resolved, rejected }) =>
        next.then(
          // @ts-ignore
          resolved,
          rejected,
        ),
      Promise.resolve(config),
    ) as Promise<AxiosResponse>;
  };

  /**
   * @internal
   */
  private eachInterceptors<T extends 'request' | 'response'>(
    type: T,
    executor: InterceptorExecutor<
      T extends 'request' ? AxiosRequestConfig : AxiosResponse
    >,
  ) {
    // @ts-ignore
    this.interceptors[type].forEach(executor);
    if (this.parent) {
      this.parent.eachInterceptors(type, executor);
    }
  }

  /**
   * 注册中间件
   *
   * 示例1：注册一个中间件
   * ```ts
   * axios.use(async function middleware(ctx, next) {
   *   console.log(ctx.req);
   *   await next();
   *   console.log(ctx.res);
   * });
   * ```
   *
   * 示例2：链式注册多个中间件
   * ```ts
   * axios
   *  .use(async function middleware1(ctx, next) {
   *    console.log(ctx.req);
   *    await next();
   *    console.log(ctx.res);
   *  })
   *  .use(async function middleware2(ctx, next) {
   *    console.log(ctx.req);
   *    await next();
   *    console.log(ctx.res);
   *  });
   * ```
   */
  use = (middleware: MiddlewareCallback) => {
    this.middleware.use(middleware);
    return this;
  };

  /**
   * @internal
   */
  private handleRequest = async (config: AxiosRequestConfig) => {
    const ctx = this.middleware.createContext(config);
    await this.run(ctx, this.handleResponse);
    return ctx.res as AxiosResponse;
  };

  /**
   * @internal
   */
  private async handleResponse(ctx: MiddlewareContext) {
    ctx.res = await dispatchRequest(ctx.req);
  }

  /**
   * @internal
   */
  private run = (
    ctx: MiddlewareContext,
    respond: MiddlewareCallback,
  ): Promise<void> => {
    if (!this.parent) {
      return this.middleware.run(ctx, respond);
    }
    return this.middleware.enhanceRun(this.parent.run)(ctx, respond);
  };
}

for (const method of PLAIN_METHODS) {
  Axios.prototype[method] = function processRequestMethod(url, config = {}) {
    config.method = method;
    return this.request(url, config);
  };
}

for (const method of WITH_PARAMS_METHODS) {
  Axios.prototype[method] = function processRequestMethodWithParams(
    url,
    params,
    config = {},
  ) {
    config.method = method;
    config.params = deepMerge(params, config.params);
    return this.request(url, config);
  };
}

for (const method of WITH_DATA_METHODS) {
  Axios.prototype[method] = function processRequestMethodWithData(
    url,
    data,
    config = {},
  ) {
    config.method = method;
    config.data = data;
    return this.request(url, config);
  };
}
