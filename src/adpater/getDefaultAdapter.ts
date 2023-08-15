import { isFunction, isPlainObject } from '../helpers/types';
import { AxiosAdapterPlatform, createAdapter } from './createAdapter';

/**
 * 获取支持的平台适配器
 */
export function getDefaultAdapter() {
  const platform = revisePlatformApiNames(getPlatform());
  if (isPlatform(platform)) {
    return createAdapter(platform);
  }
}

function getPlatform() {
  const undef = 'undefined';

  // 微信小程序
  if (typeof wx !== undef) {
    return wx;
  }
  // 支付宝小程序
  else if (typeof my !== undef) {
    return my;
  }
  // 百度小程序
  else if (typeof swan !== undef) {
    return swan;
  }
  // 抖音小程序 | 飞书小程序
  else if (typeof tt !== undef) {
    return tt;
  }
  // QQ 小程序
  else if (typeof qq !== undef) {
    return qq;
  }
  // 360 小程序
  else if (typeof qh !== undef) {
    return qh;
  }
  // 快手小程序
  else if (typeof ks !== undef) {
    return ks;
  }
  // 钉钉小程序
  else if (typeof dd !== undef) {
    return dd;
  }
  // 京东小程序
  else if (typeof jd !== undef) {
    return jd;
  }
  // 小红书小程序
  else if (typeof xhs !== undef) {
    return xhs;
  }
}

function revisePlatformApiNames(platform?: AnyObject) {
  if (platform) {
    return {
      request: platform.request ?? platform.httpRequest,
      upload: platform.upload ?? platform.uploadFile,
      download: platform.download ?? platform.downloadFile,
    };
  }
}

function isPlatform(value: any): value is AxiosAdapterPlatform {
  return (
    isPlainObject(value) &&
    isFunction(value.request) &&
    isFunction(value.upload) &&
    isFunction(value.download)
  );
}
