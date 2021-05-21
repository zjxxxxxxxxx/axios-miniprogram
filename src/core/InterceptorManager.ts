export interface InterceptorResolved<T = any> {
  (value: T): T | Promise<T>;
}

export interface InterceptorRejected {
  (error: any): any | Promise<any>;
}

export interface Interceptor<T = any> {
  resolved: InterceptorResolved<T>;
  rejected?: InterceptorRejected;
}

export interface InterceptorExecutor {
  (interceptor: Interceptor): void;
}

export default class InterceptorManager<T = any> {
  private id = 0;

  private interceptors: AnyObject<Interceptor<T>> = {};

  public use(
    resolved: InterceptorResolved,
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
    let interceptors: Interceptor[] = Object.keys(this.interceptors).map(
      (id) => this.interceptors[id],
    );

    if (reverse === 'reverse') {
      interceptors = interceptors.reverse();
    }

    interceptors.forEach(executor);
  }
}
