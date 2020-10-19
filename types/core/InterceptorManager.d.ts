import { InterceptorResolved, InterceptorRejected, InterceptorExecutor, InterceptorManager } from '../types';
/**
 * 拦截器管理器
 */
export default class InterceptorManagerClass<T> implements InterceptorManager<T> {
    /**
     * 生成拦截器 id
     */
    private _id;
    /**
     * 拦截器集合
     */
    private _interceptors;
    use(resolved: InterceptorResolved<T>, rejected?: InterceptorRejected): number;
    eject(id: number): void;
    forEach(executor: InterceptorExecutor<T>, reverse?: 'reverse'): void;
}
