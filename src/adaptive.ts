import { Adapter, Platform } from './types';
import { isUndefined } from './helpers/utils';

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
  const stack: (() => Adapter)[] = [
    () => uni.request,
    () => wx.request,
    () => my.request,
    () => swan.request,
    () => tt.request,
    () => qq.request,
  ];

  let adapter: Adapter | undefined;

  while (stack.length !== 0 && isUndefined(adapter)) {
    try {
      adapter = (stack.shift() as () => Adapter)();
    } catch (err) {}
  }

  return adapter;
}
