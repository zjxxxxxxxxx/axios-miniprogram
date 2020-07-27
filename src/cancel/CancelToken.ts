import { CancelToken, CancelAction, CancelExecutor, CancelTokenSource } from '../types';
import Cancel from './Cancel';

export default class CancelTokenClass implements CancelToken {
  /**
   * 取消请求
   */
  private _reason?: Cancel;

  public listener: Promise<Cancel>;

  public constructor(executor: CancelExecutor) {
    let action!: CancelAction;

    this.listener = new Promise<Cancel>((resolve) => {
      action = (message) => {
        // 防止重复取消
        if (this._reason) {
          return;
        }

        this._reason = new Cancel(message);

        resolve(this._reason);
      };
    });

    executor(action);
  }

  public throwIfRequested(): void {
    if (this._reason) {
      throw this._reason;
    }
  }

  /**
   * 返回一个 CancelTokenSource
   *
   * CancelTokenSource.token 是一个 CancelToken 对象
   *
   * CancelTokenSource.cancel 是一个 CancelAction 函数
   *
   * 调用 CancelTokenSource.cancel('这里可以填写您的错误信息')
   *
   * 取消请求 CancelTokenSource.token
   */
  public static source(): CancelTokenSource {
    let cancel!: CancelAction;

    const token = new CancelTokenClass(function executor(action) {
      cancel = action;
    });

    return {
      token,
      cancel,
    };
  }
}
