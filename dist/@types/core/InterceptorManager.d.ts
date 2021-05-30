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
  private id;
  private interceptors;
  use(resolved: InterceptorResolved, rejected?: InterceptorRejected): number;
  eject(id: number): void;
  forEach(executor: InterceptorExecutor, reverse?: 'reverse'): void;
}
