/*
 * @Author: early-autumn
 * @Date: 2020-04-19 22:30:24
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-19 22:45:00
 */

/**
 * 如果出错就抛出异常
 *
 * @param message 错误信息
 */
export default function warning(message: string): void {
  const errMsg = `[axios-miniprogram]
    ${message}`;

  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(errMsg);
  }

  try {
    throw new Error(errMsg);
  } catch (e) {}
}
