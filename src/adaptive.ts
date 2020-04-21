/*
 * @Author: early-autumn
 * @Date: 2020-04-17 12:18:25
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-21 12:33:20
 */
import { Adapter, Platform } from './types';

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
// uniapp
declare let uni: Platform;

const platformList = [
  () => uni.request,
  () => wx.request,
  () => my.request,
  () => swan.request,
  () => tt.request,
  () => qq.request,
];

/**
 * 设置当前平台适配器
 *
 * 使用 try + catch递归 的方式实现平台的查找, 解决 typescript 开发时, wx,my,... 等全局变量未定义可能会报错导致程序被中止的问题
 *
 * 比如 ReferenceError: wx is not defined
 */
function adaptive(adapter?: Adapter): Adapter | undefined {
  if (adapter !== undefined) {
    return adapter;
  }

  try {
    const platform = platformList.shift();

    if (platform === undefined) {
      return;
    }

    adapter = platform();

    throw 'next';
  } catch (err) {
    return adaptive(adapter);
  }
}

export default adaptive;
