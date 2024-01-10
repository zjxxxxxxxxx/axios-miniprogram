export interface InterceptorResolved<T = unknown> {
  (value: T): T | Promise<T>;
}

export interface InterceptorRejected<T = unknown> {
  (error: unknown): T | Promise<T>;
}

/**
 * 拦截器
 */
export interface Interceptor<T = unknown> {
  /**
   * 成功的回调
   */
  resolved: InterceptorResolved<T>;
  /**
   * 失败的回调
   */
  rejected?: InterceptorRejected<T>;
}

export interface InterceptorExecutor<T = unknown> {
  (interceptor: Interceptor<T>): void;
}

/**
 * 拦截器管理器
 */
export default class InterceptorManager<T = unknown> {
  /**
   * @internal
   *
   * 生成拦截器标识符
   */
  private id = 0;

  /**
   * @internal
   *
   * 拦截器缓存池
   */
  private interceptors = new Map<number, Interceptor<T>>();

  /**
   * @internal
   *
   * 拦截器数量
   */
  get size() {
    return this.interceptors.size;
  }

  /**
   * 添加拦截器
   *
   * @param resolved 成功的回调
   * @param rejected 失败的回调
   * @returns 拦截器标识符（可用于移除拦截器）
   */
  use(
    resolved: InterceptorResolved<T>,
    rejected?: InterceptorRejected<T>,
  ): number {
    this.interceptors.set(++this.id, {
      resolved,
      rejected,
    });

    return this.id;
  }

  /**
   * 移除拦截器
   *
   * @param id 拦截器标识符
   */
  eject(id: number): boolean {
    return this.interceptors.delete(id);
  }

  /**
   * 清空拦截器
   */
  clear() {
    this.interceptors.clear();
  }

  /**
   * @internal
   *
   * 遍历拦截器
   *
   * @param executor 执行器
   */
  forEach(executor: InterceptorExecutor<T>): void {
    this.interceptors.forEach(executor);
  }
}
