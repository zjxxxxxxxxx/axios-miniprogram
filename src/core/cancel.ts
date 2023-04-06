export interface CancelAction {
  (
    /**
     * 取消信息
     */
    message?: string,
  ): void;
}

export interface CancelExecutor {
  (
    /**
     * 取消函数
     */
    cancel: CancelAction,
  ): void;
}

export interface CancelTokenSource {
  /**
   * 取消令牌
   */
  token: CancelToken;
  /**
   * 取消函数
   */
  cancel: CancelAction;
}

export interface CancelTokenConstructor {
  new (executor: CancelExecutor): CancelToken;
  source(): CancelTokenSource;
}

export class Cancel {
  public message?: string;

  public constructor(message?: string) {
    this.message = message;
  }

  public toString(): string {
    const message = this.message ? `: ${this.message}` : '';

    return `Cancel${message}`;
  }
}

export function isCancel(value: unknown): value is Cancel {
  return value instanceof Cancel;
}

export class CancelToken {
  private reason?: Cancel;

  public onCancel: Promise<Cancel>['then'];

  public constructor(executor: CancelExecutor) {
    let action!: CancelAction;
    const promise = new Promise<Cancel>((resolve) => {
      action = (message) => {
        if (this.reason) {
          return;
        }

        this.reason = new Cancel(message);

        resolve(this.reason);
      };
    });

    this.onCancel = promise.then.bind(promise);

    executor(action);
  }

  public static source(): CancelTokenSource {
    let cancel!: CancelAction;
    const token = new CancelToken((action) => {
      cancel = action;
    });

    return {
      token,
      cancel,
    };
  }

  public throwIfRequested(): void {
    if (this.reason) {
      throw this.reason;
    }
  }
}

export function isCancelToken(value: unknown): value is CancelToken {
  return value instanceof CancelToken;
}
