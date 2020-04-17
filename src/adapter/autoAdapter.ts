/*
 * @Author: early-autumn
 * @Date: 2020-04-17 12:18:25
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-17 23:57:43
 */
import { PlatformRequest } from '../types';

interface Platform {
  request?: PlatformRequest;
  httpRequest?: PlatformRequest;
}

/* eslint-disable no-var */
var wx: Platform;
var swan: Platform;
var my: Platform;
var tt: Platform;
var qq: Platform;
var uni: Platform;

/**
 * 当前平台请求函数
 */
let adapter: PlatformRequest | undefined;

/**
 * 设置当前平台请求函数
 */
function adaptive(): void {
  switch (true) {
    // 微信小程序
    case wx !== undefined:
      adapter = wx.request;
    // 支付宝小程序
    case my !== undefined:
      adapter = my.request ?? my.httpRequest;
    // 百度小程序
    case swan !== undefined:
      adapter = swan.request;
    // 字节跳动小程序
    case tt !== undefined:
      adapter = tt.request;
    // QQ 小程序
    case qq !== undefined:
      adapter = qq.request;
    // uniapp
    case uni !== undefined:
      adapter = uni.request;
    default:
      throw new Error('暂未适配此平台，您需要参阅文档使用自定义适配器手动适配当前平台');
  }
}

adaptive();

export default adapter;
