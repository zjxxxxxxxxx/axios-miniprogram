# axios-miniprogram

<p style="display: flex;margin-left:-5px;">
  <a href="https://github.com/zjx0905/axios-miniprogram/actions/workflows/ci.yml">
    <img src="https://github.com/zjx0905/axios-miniprogram/actions/workflows/ci.yml/badge.svg" alt="ci">
  </a>
  <a style="margin-left:5px;" href="https://www.npmjs.org/package/axios-miniprogram">
    <img src="https://img.shields.io/npm/v/axios-miniprogram" alt="npm">
  </a>
  <a style="margin-left:5px;" href="https://codecov.io/gh/zjx0905/axios-miniprogram" > 
    <img src="https://codecov.io/gh/zjx0905/axios-miniprogram/branch/main/graph/badge.svg?token=WIQVYX2WIK" alt="codecov"/> 
  </a>
  <a style="margin-left:5px;" href="https://www.npmjs.org/package/axios-miniprogram">
    <img src="https://img.shields.io/bundlephobia/min/axios-miniprogram" alt="npm bundle size">
  </a>  
  <a style="margin-left:5px;" href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/github/license/zjx0905/axios-miniprogram" alt="license">
  </a>
</p>

[中文文档](https://axios-miniprogram.com)

## axios-miniprogram 是什么？

axios-miniprogram 是一款为小程序平台量身定制的轻量级请求库，支持跨平台使用，同时也支持多种导入方式，可用于原生小程序项目，也可用于第三方框架项目，用法上同 [axios](https://github.com/axios/axios.git) 类似。

## 特性

- 支持 `Typescript`，健全的类型系统，智能的 `IDE` 提示。
- 支持 动态地址。
- 支持 校验状态码。
- 支持 参数序列化。
- 支持 上传/下载。
- 支持 错误处理。
- 支持 转换数据。
- 支持 取消请求。
- 支持 扩展实例。
- 支持 中间件。
- 支持 拦截器。
- 支持 平台适配器。

## 目前内部支持的平台

- [微信小程序](https://developers.weixin.qq.com/miniprogram/dev/framework/?from=axios-miniprogram)
- [支付宝小程序](https://opendocs.alipay.com/mini/developer/getting-started?from=axios-miniprogram)
- [百度小程序](https://smartprogram.baidu.com/developer/index.html?from=axios-miniprogram)
- [京东小程序](https://mp.jd.com?from=axios-miniprogram)
- [抖音小程序](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/introduction/overview?from=axios-miniprogram)
- [QQ 小程序](https://q.qq.com/wiki/develop/miniprogram/frame/?from=axios-miniprogram)
- [钉钉小程序](https://open.dingtalk.com/document/org/develop-org-mini-programs?from=axios-miniprogram)
- [飞书小程序](https://open.feishu.cn/document/uYjL24iN/uMjNzUjLzYzM14yM2MTN?from=axios-miniprogram)
- [快手小程序](https://mp.kuaishou.com/docs/introduction/quickStart.html?from=axios-miniprogram)
- [360 小程序](https://mp.360.cn/doc/miniprogram/dev/#/f4b41f0cc5683bce78dfadfa7f3c73e7?from=axios-miniprogram)

## 关于在跨端框架中使用时的支持度

问：在 uni-app 或者 Taro 等等这类跨端框架中使用时，该请求库支持 h5，APP，vue3，react 等等吗？

答：该请求库只是对框架提供的请求 API 进行了封装，并没有使用什么黑魔法。理论上来讲，框架支持的平台，该库也必然支持。

有问题欢迎反馈，请尽量把问题提到 [github issues](https://github.com/zjx0905/axios-miniprogram/issues) 中，这样更容易被我注意到。

[提问点这里](https://github.com/zjx0905/axios-miniprogram/issues)

## 未来计划

2023 年 6 月 1 日 起该库将不再内部支持第三方框架，内置的 uni-app 即将移除，您依旧可以使用[适配器](https://axios-miniprogram.com/advanced/adapter)兼容 uni-app。
