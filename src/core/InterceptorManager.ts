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
  #id = 0;

  #interceptors: AnyObject<Interceptor<T>> = {};

  use(
    resolved: InterceptorResolved<T>,
    rejected?: InterceptorRejected,
  ): number {
    this.#interceptors[++this.#id] = {
      resolved,
      rejected,
    };

    return this.#id;
  }

  eject(id: number): void {
    delete this.#interceptors[id];
  }

  forEach(executor: InterceptorExecutor, reverse?: boolean): void {
    let interceptors: Interceptor<any>[] = Object.values(this.#interceptors);
    if (reverse) interceptors = interceptors.reverse();
    interceptors.forEach(executor);
  }
}
