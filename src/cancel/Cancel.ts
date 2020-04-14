/*
 * @Author: early-autumn
 * @Date: 2020-04-13 21:14:53
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-14 13:41:45
 */
import { Cancel } from '../types';

export default class CancelStatic implements Cancel {
  message?: string;

  constructor(message?: string) {
    this.message = message;
  }

  toString() {
    const message = this.message ? `: ${this.message}` : '';

    return `Cancel${message}`;
  }
}
