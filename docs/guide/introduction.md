---
title: 简介
sidebarDepth: 1
lastUpdated: true
sitemap:
  priority: 0.8
---

# axios-miniprogram

[![npm version](https://badge.fury.io/js/axios-miniprogram.svg)](https://badge.fury.io/js/axios-miniprogram)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

[中文文档](https://axios-miniprogram.com)

## 安装

```bash
$ yarn add axios-miniprogram
```

或者

```bash
$ npm i axios-miniprogram
```

[原生小程序也可以直接下载源码包](https://github.com/zjx0905/axios-miniprogram/releases)

# 简介

## 什么是 axios-miniprogram？

axios-miniprogram 是一款为小程序平台量身定制的轻量级请求库，支持跨平台使用，同时也支持多种导入方式，可用于原生小程序项目，也可用于第三方框架项目，用法上同 [axios](git@github.com:axios/axios.git) 类似。

## 特性

- 支持 `Typescript`，健全的类型系统，智能的 `IDE` 提示。
- 支持 `Promise`。
- 支持 拦截器。
- 支持 取消请求。
- 支持 自定义合法状态码。
- 支持 自定义参数序列化。
- 支持 自定义转换数据。
- 支持 自定义错误处理。
- 支持 自定义平台适配器
- 支持 上传/下载

## 目前支持的平台

- [微信小程序](https://developers.weixin.qq.com/miniprogram/dev/framework/?from=axios-miniprogram)
- [支付宝小程序](https://opendocs.alipay.com/mini/developer/getting-started?from=axios-miniprogram)
- [百度小程序](https://smartprogram.baidu.com/developer/index.html?from=axios-miniprogram)
- [京东小程序](https://mp.jd.com?from=axios-miniprogram)
- [字节跳动小程序](https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/introduction/overview?from=axios-miniprogram)
- [QQ 小程序](https://q.qq.com/wiki/develop/miniprogram/frame/?from=axios-miniprogram)
- [钉钉小程序](https://open.dingtalk.com/document/org/develop-org-mini-programs?from=axios-miniprogram)
- [飞书小程序](https://open.feishu.cn/document/uYjL24iN/uMjNzUjLzYzM14yM2MTN?from=axios-miniprogram)
- [uni-app](https://uniapp.dcloud.net.cn?form=axios-miniprogram)

## 关于在跨端框架中使用时的支持度

问：在 uni-app 或者 Taro 等等这类跨端框架中使用时，该请求库支持 h5，APP，vue3，react 等等吗？

答：该请求库只是对框架提供的请求 API 进行了封装，并没有使用什么黑魔法。理论上来讲，框架支持的平台，该库也必然支持。

有问题欢迎反馈，请尽量把问题提到 [github issues](https://github.com/zjx0905/axios-miniprogram/issues) 中，这样更容易被我注意到。

[提问点这里](https://github.com/zjx0905/axios-miniprogram/issues)
