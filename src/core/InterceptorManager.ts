export interface InterceptorResolved<T = unknown> {
  (value: T): T | Promise<T>;
}

export interface InterceptorRejected<T = unknown> {
  (error: unknown): T | Promise<T>;
}

export interface Interceptor<T = unknown> {
  resolved: InterceptorResolved<T>;
  rejected?: InterceptorRejected<T>;
}

export interface InterceptorExecutor<T = unknown> {
  (interceptor: Interceptor<T>): void;
}

export default class InterceptorManager<T = unknown> {
  #id = 0;

  #interceptors: AnyObject<Interceptor<T>> = {};

  use(
    resolved: InterceptorResolved<T>,
    rejected?: InterceptorRejected<T>,
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

  forEach(executor: InterceptorExecutor<T>, reverse?: boolean): void {
    let interceptors: Interceptor<T>[] = Object.values(this.#interceptors);
    if (reverse) interceptors = interceptors.reverse();
    interceptors.forEach(executor);
  }
}
