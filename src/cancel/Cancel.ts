import { Cancel } from '../types';

export default class CancelClass implements Cancel {
  /**
   * @param message 取消信息
   */
  public constructor(public message?: string) {}

  public toString(): string {
    const message = this.message ? `: ${this.message}` : '';

    return `Cancel${message}`;
  }
}
