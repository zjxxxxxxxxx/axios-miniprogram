/*
 * @Author: early-autumn
 * @Date: 2020-04-16 00:48:45
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-16 15:22:40
 */

let request = wx?.request;

/**
 * #### 非微信小程序中使用 axios 前需要先调用此函数重新设置请求方法
 *
 * 假设在 uniapp 中使用:
 *
 * ```typescript
 * import axios, { setRequest } from 'axios-miniprogram';
 *
 * // 先设置 request
 * setRequest(uni.request);
 *
 * // 现在可以正常发送请求了
 * axios('/test')
 * ```
 *
 * * 使用 `javascript` 开发忽略, 使用 `typescript` 开发注意: `axios 类型系统`是基于`微信小程序内置类型`定义的, 在其他平台使用类型可能存在不兼容的情况
 *
 * @param r 需要设置的请求方法
 *
 */
export function setRequest(r: any): void {
  request = r;
}

export default request;
