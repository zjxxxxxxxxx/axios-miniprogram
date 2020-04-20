/*
 * @Author: early-autumn
 * @Date: 2020-04-20 09:17:40
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-20 09:19:11
 */

/**
 * 检查是否是一个绝对 URL
 *
 * xxx:// 或者 "//" 开头,  视为绝对地址
 *
 * @param url 需要检查的 URL
 */
export default function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}
