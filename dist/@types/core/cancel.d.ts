export interface CancelAction {
  (message?: string): void;
}
export interface CancelExecutor {
  (cancel: CancelAction): void;
}
export interface CancelTokenSource {
  token: CancelToken;
  cancel: CancelAction;
}
export interface CancelTokenConstructor {
  new (executor: CancelExecutor): CancelToken;
  source(): CancelTokenSource;
}
export declare class Cancel {
  message?: string;
  constructor(message?: string);
  toString(): string;
}
export declare function isCancel(value: any): value is Cancel;
export declare class CancelToken {
  private reason?;
  listener: Promise<Cancel>;
  constructor(executor: CancelExecutor);
  static source(): CancelTokenSource;
  throwIfRequested(): void;
}
export declare function isCancelToken(value: any): value is CancelToken;
