/*
 * @Author: early-autumn
 * @Date: 2020-04-13 21:14:53
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-22 17:38:43
 */
import { Cancel } from '../types';

export default class CancelStatic implements Cancel {
  public message?: string;

  constructor(message?: string) {
    this.message = message;
  }

  public toString() {
    const message = this.message ? `: ${this.message}` : '';

    return `Cancel${message}`;
  }
}
