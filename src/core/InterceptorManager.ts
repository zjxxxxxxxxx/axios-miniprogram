export interface InterceptorResolved<T = unknown> {
  (value: T): T | Promise<T>;
}

export interface InterceptorRejected {
  (error: unknown): unknown | Promise<unknown>;
}

export interface Interceptor<T = unknown> {
  resolved: InterceptorResolved<T>;
  rejected?: InterceptorRejected;
}

export interface InterceptorExecutor {
  (interceptor: Interceptor): void;
}

export default class InterceptorManager<T = unknown> {
  private id = 0;

  private interceptors: AnyObject<Interceptor<T>> = {};

  public use(
    resolved: InterceptorResolved<T>,
    rejected?: InterceptorRejected,
  ): number {
    this.interceptors[++this.id] = {
      resolved,
      rejected,
    };

    return this.id;
  }

  public eject(id: number): void {
    delete this.interceptors[id];
  }

  public forEach(executor: InterceptorExecutor, reverse?: 'reverse'): void {
    let interceptors: Interceptor<any>[] = Object.keys(this.interceptors).map(
      (id) => this.interceptors[id],
    );

    if (reverse === 'reverse') {
      interceptors = interceptors.reverse();
    }

    interceptors.forEach(executor);
  }
}
