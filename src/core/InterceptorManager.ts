import {
  InterceptorResolved,
  InterceptorRejected,
  Interceptor,
  InterceptorExecutor,
  InterceptorManager,
} from '../types';

/**
 * 拦截器管理器
 */
export default class InterceptorManagerClass<T> implements InterceptorManager<T> {
  /**
   * 生成拦截器 id
   */
  private _id = 0;

  /**
   * 拦截器集合
   */
  private _interceptors: Record<number, Interceptor<T>> = {};

  public use(resolved: InterceptorResolved<T>, rejected?: InterceptorRejected): number {
    this._interceptors[++this._id] = {
      resolved,
      rejected,
    };

    return this._id;
  }

  public eject(id: number): void {
    delete this._interceptors[id];
  }

  public forEach(executor: InterceptorExecutor<T>, reverse?: 'reverse'): void {
    let interceptors: Interceptor<T>[] = Object.values(this._interceptors);

    if (reverse === 'reverse') {
      interceptors = interceptors.reverse();
    }

    interceptors.forEach(executor);
  }
}
