/*
 * @Author: early-autumn
 * @Date: 2020-04-17 12:18:25
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-17 13:56:02
 */
import { Request } from '../types';

interface Platform {
  request?: Request;
  httpRequest?: Request;
}

/* eslint-disable no-var */
var swan: Platform;
var my: Platform;
var uni: Platform;

/**
 * 当前平台请求函数
 */
let request: Request | undefined = wx?.request;

/**
 * 设置当前平台请求函数
 */
function adaptive(): void {
  switch (true) {
    // 支付宝小程序
    case typeof my === 'object':
      request = my.request ?? my.httpRequest;
    // 百度小程序
    case typeof swan === 'object':
      request = swan.request;
    // uniapp
    case typeof uni === 'object':
      request = uni.request;
    // 微信小程序
    default:
      request = wx.request;
  }
}

adaptive();

export default request;
