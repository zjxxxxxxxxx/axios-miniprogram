/*
 * @Author: early-autumn
 * @Date: 2020-04-13 20:00:08
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-14 19:17:53
 */
import { CancelToken, CancelAction, CancelExecutor, CancelTokenSource } from '../types';
import Cancel from './Cancel';

export default class CancelTokenStatic implements CancelToken {
  reason?: Cancel;

  listener: Promise<Cancel>;

  constructor(executor: CancelExecutor) {
    let action!: CancelAction;

    this.listener = new Promise<Cancel>((resolve) => {
      action = (message) => {
        // 防止重复取消
        if (this.reason) {
          return;
        }

        this.reason = new Cancel(message);

        resolve(this.reason);
      };
    });

    executor(action);
  }

  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
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
   * 取消 CancelTokenSource.token
   */
  static source(): CancelTokenSource {
    let cancel!: CancelAction;

    const token = new CancelTokenStatic(function executor(action) {
      cancel = action;
    });

    return {
      token,
      cancel,
    };
  }
}
