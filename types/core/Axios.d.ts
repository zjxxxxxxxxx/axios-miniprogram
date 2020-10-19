import { Params, Data, Interceptors, AxiosRequestConfig, AxiosResponse, Axios } from '../types';
export default class AxiosClass implements Axios {
    defaults: AxiosRequestConfig;
    interceptors: Interceptors;
    /**
     * @param defaults 自定义默认配置
     */
    constructor(defaults?: AxiosRequestConfig);
    getUri(config: AxiosRequestConfig): string;
    request<T extends Data>(config: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    options<T extends Data>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    get<T extends Data>(url: string, params?: Params, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    head<T extends Data>(url: string, params?: Params, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    post<T extends Data>(url: string, data?: Data, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    put<T extends Data>(url: string, data?: Data, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    delete<T extends Data>(url: string, params?: Params, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    trace<T extends Data>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    connect<T extends Data>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    /**
     * 合并配置后发送 HTTP 请求
     *
     * @param method 请求方法
     * @param url    请求地址
     * @param params 请求参数
     * @param config 额外配置
     */
    private _requestMethodWithoutParams;
    /**
     * 合并配置后发送 HTTP 请求
     *
     * @param method 请求方法
     * @param url    请求地址
     * @param data   请求数据
     * @param config 额外配置
     */
    private _requestMethodWithoutData;
}
