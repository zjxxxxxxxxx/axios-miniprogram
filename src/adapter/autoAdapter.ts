/*
 * @Author: early-autumn
 * @Date: 2020-04-17 12:18:25
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-17 17:07:34
 */
import { Request } from '../types';

interface Platform {
  request?: Request;
  httpRequest?: Request;
}

/* eslint-disable no-var */
let swan: Platform;
var my: Platform;
var tt: Platform;
var qq: Platform;
var uni: Platform;

/**
 * 当前平台请求函数
 */
let adapter: Request | undefined = wx?.request;

/**
 * 设置当前平台请求函数
 */
function adaptive(): void {
  switch (true) {
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
    // 微信小程序
    default:
      adapter = wx.request;
  }
}

adaptive();

export default adapter;
