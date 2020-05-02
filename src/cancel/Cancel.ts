/*
 * @Author: early-autumn
 * @Date: 2020-04-13 21:14:53
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-25 09:26:10
 */
import { Cancel } from '../types';

export default class CancelStatic implements Cancel {
  /**
   * @param message 取消信息
   */
  public constructor(public message?: string) {}

  public toString() {
    const message = this.message ? `: ${this.message}` : '';

    return `Cancel${message}`;
  }
}
