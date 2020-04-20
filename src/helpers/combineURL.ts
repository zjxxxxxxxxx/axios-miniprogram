/*
 * @Author: early-autumn
 * @Date: 2020-04-20 09:16:47
 * @LastEditors: early-autumn
 * @LastEditTime: 2020-04-20 09:19:23
 */

/**
 * 拼接 baseURL 和 url 获得完整的 URL
 *
 * combineURL('1/2///','////3/4') => '1/2/3/4'
 */
export default function combineURL(baseURL: string, url: string): string {
  return `${baseURL.replace(/\/*$/, '')}/${url.replace(/^\/*/, '')}`;
}
