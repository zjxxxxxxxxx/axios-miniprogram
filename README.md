# axios-miniprogram

[![build status](https://travis-ci.com/early-autumn/axios-miniprogram.svg?branch=master)](https://travis-ci.org/early-autumn/axios-miniprogram)
[![Coverage Status](https://coveralls.io/repos/github/early-autumn/axios-miniprogram/badge.svg?branch=master)](https://coveralls.io/github/early-autumn/axios-miniprogram?branch=master)
[![npm version](https://badge.fury.io/js/axios-miniprogram.svg)](https://badge.fury.io/js/axios-miniprogram)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

## 安装

`
yarn add axios-miniprogram
`

或者

`
npm i axios-miniprogram
`

## 简介

小程序平台专用请求库，实现了 [axios](https://github.com/axios/axios) 大部分功能，用法存在微小差异。

* 支持 微信小程序、支付宝小程序、百度小程序、字节跳动小程序、QQ 小程序、uniapp。
* 支持 `Typescript`，健全的类型系统，智能的 `IDE` 提示。
* 支持 `Promise`。
* 支持 拦截器。
* 支持 取消请求。
* 支持 自定义参数序列化。
* 支持 自定义转换数据。
* 支持 自定义成功状态码。
* 支持 自定义平台适配器

## API

可以通过将相关配置传递给 `axios` 来发送请求。

### `axios(config)`

```typescript
  // 默认发送 GET 请求
  axios({
    url: '/test',
    params: { test: 1 }
  });

  // 发送 POST 请求
  axios({
    url: '/test',
    method: 'post',
    data: { test: 1 }
  });
```

也可以通过直接把 `url` 传给 `axios` 来发送请求。

### `axios(url, config?)`

```typescript
  // 默认发送 GET 请求
  axios('/test/xxx');

  // 发送 POST 请求
  axios('/test/xxx', { method: 'post' });
```

也可以使用请求方法别名来简化请求

##### axios.request(config)

##### axios.options(url, config?)
##### axios.trace(url, config?)
##### axios.connect(url, config?) 

##### axios.get(url, params?, config?)
##### axios.head(url, params?, config?)
##### axios.delete(url, params?, config?)

##### axios.post(url, data?, config?)
##### axios.put(url, data?, config?)

常用例子，其他同理：

```typescript
  // 发送 GET 请求
  axios.get('/test');

  // 携带参数
  axios.get('/test', { test: 1 });

  // 携带额外配置
  axios.get('/test', { test: 1 }, { 
    headers: {
      'content-type': 'application/json; charset=utf-8'
    }
  });

  // 发送  POST 请求
  axios.post('/test');

  // 携带数据
  axios.post('/test', { test: 1 });

  // 携带额外配置
  axios.post('/test', { test: 1 }, { 
    headers: {
      'content-type': 'application/json; charset=utf-8'
    }
  });
```