/*
 * @Author: early-autumn
 * @Date: 2020-04-17 12:18:25
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-19 01:15:42
 */
import { Adapter, Platform } from '../types';

declare let wx: Platform;
declare let my: Platform;
declare let swan: Platform;
declare let tt: Platform;
declare let qq: Platform;
declare let uni: Platform;

/**
 * 设置当前平台适配器
 */
function adaptive(): Adapter | undefined {
  switch (true) {
    // 微信小程序
    case wx !== undefined:
      return wx.request;
    // 支付宝小程序
    case my !== undefined:
      return my.request ?? my.httpRequest;
    // 百度小程序
    case swan !== undefined:
      return swan.request;
    // 字节跳动小程序
    case tt !== undefined:
      return tt.request;
    // QQ 小程序
    case qq !== undefined:
      return qq.request;
    // uniapp
    case uni !== undefined:
      return uni.request;
    default:
      throw new Error('暂未适配此平台，您需要参阅文档使用自定义适配器手动适配当前平台');
  }
}

export default adaptive;
