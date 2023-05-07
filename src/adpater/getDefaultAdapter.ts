import { isFunction, isPlainObject } from '../helpers/types';
import { AxiosAdapterPlatform, createAdapter } from './createAdapter';

/**
 * 获取支持的平台适配器
 */
export function getDefaultAdapter() {
  const platform = revisePlatformApiNames(getPlatform());
  if (!isPlatform(platform)) {
    return;
  }

  function getPlatform() {
    const undef = 'undefined';

    if (typeof uni !== undef) {
      return {
        request: uni.request,
        downloadFile: uni.downloadFile,
        uploadFile: uni.uploadFile,
      };
    } else if (typeof wx !== undef) {
      return wx;
    } else if (typeof my !== undef) {
      return my;
    } else if (typeof swan !== undef) {
      return swan;
    } else if (typeof tt !== undef) {
      return tt;
    } else if (typeof qq !== undef) {
      return qq;
    } else if (typeof qh !== undef) {
      return qh;
    } else if (typeof ks !== undef) {
      return ks;
    } else if (typeof dd !== undef) {
      return dd;
    } else if (typeof jd !== undef) {
      return jd;
    }
  }

  function revisePlatformApiNames(platform?: AnyObject) {
    return (
      platform && {
        request: platform.request ?? platform.httpRequest,
        upload: platform.upload ?? platform.uploadFile,
        download: platform.download ?? platform.downloadFile,
      }
    );
  }

  function isPlatform(value: any): value is AxiosAdapterPlatform {
    return (
      isPlainObject(value) &&
      isFunction(value.request) &&
      isFunction(value.upload) &&
      isFunction(value.download)
    );
  }

  return createAdapter(platform);
}
