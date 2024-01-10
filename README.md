<h1 align="center">axios-miniprogram</h1>

<p style="text-align: center;" align="center">
  <a style="display: inline-block;margin-left: 5px;" href="https://github.com/zjxxxxxxxxx/axios-miniprogram/actions/workflows/ci.yml">
    <img src="https://github.com/zjxxxxxxxxx/axios-miniprogram/actions/workflows/ci.yml/badge.svg" alt="ci"/>
  </a>
  <a style="display: inline-block;margin-left: 5px;" href="https://codecov.io/gh/zjxxxxxxxxx/axios-miniprogram" > 
    <img src="https://codecov.io/gh/zjxxxxxxxxx/axios-miniprogram/branch/main/graph/badge.svg?token=WIQVYX2WIK" alt="codecov"/> 
  </a>
  <a style="display: inline-block;margin-left: 5px;" href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/github/license/zjxxxxxxxxx/axios-miniprogram" alt="license"/>
  </a>
  <a style="display: inline-block;margin-left: 5px;" href="https://www.npmjs.org/package/axios-miniprogram">
    <img src="https://img.shields.io/bundlephobia/min/axios-miniprogram" alt="npm bundle size"/>
  </a> 
  <a style="display: inline-block;" href="https://www.npmjs.org/package/axios-miniprogram">
    <img alt="npm" src="https://img.shields.io/npm/dt/axios-miniprogram"/>
  </a>
</p>

<p style="text-align: center;" align="center">
  <a href='https://axios-miniprogram.com'>中文文档</a>
</p>

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
- [小红书小程序](https://miniapp.xiaohongshu.com/docs/guide/miniIntroduce?from=axios-miniprogram)

## 关于在跨端框架中使用时的支持度

问：在 uni-app 或者 Taro 等等这类跨端框架中使用时，该请求库支持 h5，APP，vue3 等等吗？

答：该请求库只是对框架提供的请求 API 进行了封装，并没有使用什么黑魔法。理论上来讲，框架支持的平台，该库也必然支持。

有问题欢迎反馈，请尽量把问题提到 [github issues](https://github.com/zjxxxxxxxxx/axios-miniprogram/issues) 中，这样更容易被我注意到。

[提问点这里](https://github.com/zjxxxxxxxxx/axios-miniprogram/issues)

## 跨端框架示例

### Taro

- [源代码](https://github.com/zjxxxxxxxxx/axios-miniprogram/tree/main/examples/taro)
- [CodeSandbox](https://codesandbox.io/p/sandbox/github/zjxxxxxxxxx/axios-miniprogram/tree/main/examples/taro)
- [StackBlitz](https://stackblitz.com/github/zjxxxxxxxxx/axios-miniprogram/tree/main/examples/taro)

### uni-app

- [源代码](https://github.com/zjxxxxxxxxx/axios-miniprogram/tree/main/examples/uni-app)
- [CodeSandbox](https://codesandbox.io/p/sandbox/github/zjxxxxxxxxx/axios-miniprogram/tree/main/examples/uni-app)
- [StackBlitz](https://stackblitz.com/github/zjxxxxxxxxx/axios-miniprogram/tree/main/examples/uni-app)
