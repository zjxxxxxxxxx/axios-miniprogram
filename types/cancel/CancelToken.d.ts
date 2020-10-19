import { CancelToken, CancelExecutor, CancelTokenSource } from '../types';
import Cancel from './Cancel';
export default class CancelTokenClass implements CancelToken {
    /**
     * 取消请求
     */
    private _reason?;
    listener: Promise<Cancel>;
    constructor(executor: CancelExecutor);
    throwIfRequested(): void;
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
    static source(): CancelTokenSource;
}
