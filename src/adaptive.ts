/*
 * @Author: early-autumn
 * @Date: 2020-04-17 12:18:25
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-25 19:10:04
 */
import { Adapter, Platform } from './types';

// uniapp
declare let uni: Platform;
// 微信小程序
declare let wx: Platform;
// 支付宝小程序
declare let my: Platform;
// 百度小程序
declare let swan: Platform;
// 字节跳动小程序
declare let tt: Platform;
// QQ 小程序
declare let qq: Platform;

/**
 * 自适应当前平台
 */
export default function adaptive(): Adapter | undefined {
  const stack = [
    () => uni.request,
    () => wx.request,
    () => my.request,
    () => swan.request,
    () => tt.request,
    () => qq.request,
  ];

  let adapter: Adapter | undefined;

  while (stack.length !== 0 && adapter === undefined) {
    try {
      adapter = (stack.shift() as Function)();
    } catch (err) {}
  }

  return adapter;
}
