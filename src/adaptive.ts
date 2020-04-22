/*
 * @Author: early-autumn
 * @Date: 2020-04-17 12:18:25
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-22 09:37:49
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

const stack = [
  () => uni.request,
  () => wx.request,
  () => my.request,
  () => swan.request,
  () => tt.request,
  () => qq.request,
];

/**
 * 自适应当前平台
 */
function adaptive(): Adapter | undefined {
  let adapter: Adapter | undefined;

  const platform = stack.shift();

  if (platform === undefined) {
    return;
  }

  try {
    adapter = platform();
  } catch (err) {}

  if (adapter !== undefined) {
    return adapter;
  }

  return adaptive();
}

export default adaptive;
