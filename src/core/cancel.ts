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

export function isCancel(value: any): value is Cancel {
  return value instanceof Cancel;
}

export class CancelToken {
  private reason?: Cancel;

  public listener: Promise<Cancel>;

  public constructor(executor: CancelExecutor) {
    let action!: CancelAction;
    this.listener = new Promise<Cancel>((resolve) => {
      action = (message) => {
        if (this.reason) {
          return;
        }

        this.reason = new Cancel(message);

        resolve(this.reason);
      };
    });

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

export function isCancelToken(value: any): value is CancelToken {
  return value instanceof CancelToken;
}
