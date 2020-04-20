/*
 * @Author: early-autumn
 * @Date: 2020-04-19 22:30:24
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-20 09:49:35
 */

/**
 * 不中断程序的报错
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
