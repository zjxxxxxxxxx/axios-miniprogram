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

  #interceptors = new Map<number, Interceptor<T>>();

  get size() {
    return this.#interceptors.size;
  }

  use(
    resolved: InterceptorResolved<T>,
    rejected?: InterceptorRejected<T>,
  ): number {
    this.#interceptors.set(++this.#id, {
      resolved,
      rejected,
    });

    return this.#id;
  }

  eject(id: number): boolean {
    return this.#interceptors.delete(id);
  }

  clear() {
    this.#interceptors.clear();
  }

  forEach(executor: InterceptorExecutor<T>): void {
    this.#interceptors.forEach(executor);
  }
}
