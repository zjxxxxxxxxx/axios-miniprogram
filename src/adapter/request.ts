/*
 * @Author: early-autumn
 * @Date: 2020-04-17 12:18:25
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-18 16:04:27
 */
import { Adapter, Platform } from '../types';

/* eslint-disable no-var */
var wx: Platform;
var swan: Platform;
var my: Platform;
var tt: Platform;
var qq: Platform;
var uni: Platform;

/**
 * 适配器
 */
let request: Adapter | undefined;

/**
 * 设置当前平台适配器
 */
function adaptive(): void {
  switch (true) {
    // 微信小程序
    case wx !== undefined:
      request = wx.request;
    // 支付宝小程序
    case my !== undefined:
      request = my.request ?? my.httpRequest;
    // 百度小程序
    case swan !== undefined:
      request = swan.request;
    // 字节跳动小程序
    case tt !== undefined:
      request = tt.request;
    // QQ 小程序
    case qq !== undefined:
      request = qq.request;
    // uniapp
    case uni !== undefined:
      request = uni.request;
    default:
      throw new Error('暂未适配此平台，您需要参阅文档使用自定义适配器手动适配当前平台');
  }
}

adaptive();

export default request;
