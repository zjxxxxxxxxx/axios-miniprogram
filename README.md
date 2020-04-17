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

可以通过将相关配置传递给`axios`来发送请求。

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

也可以通过直接把`url`传给`axios`来发送请求。

### `axios(url, config?)`

```typescript
// 默认发送 GET 请求
axios('/test/xxx');

// 发送 POST 请求
axios('/test/xxx', { method: 'post' });
```

还可以使用请求方法别名来简化请求

* ##### axios.request(config)
* ##### axios.options(url, config?)
* ##### axios.trace(url, config?)
* ##### axios.connect(url, config?) 
* ##### axios.get(url, params?, config?)
* ##### axios.head(url, params?, config?)
* ##### axios.delete(url, params?, config?)
* ##### axios.post(url, data?, config?)
* ##### axios.put(url, data?, config?)

常用例子，其他同理：

```typescript
// 发送 GET 请求
axios.get('/test');

// 携带参数
axios.get('/test', { test: 1 });

// 携带额外配置
axios.get('/test', { test: 1 }, { 
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

// 发送 POST 请求
axios.post('/test');

// 携带数据
axios.post('/test', { test: 1 });

// 携带额外配置
axios.post('/test', { test: 1 }, { 
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});
```

### 默认配置

##### 全局默认配置`axios.defaults`

```typescript
axios.defaults.baseURL = 'https://www.xxx.com';
axios.defaults.headers.common['Accept'] = 'application/json, test/plain, */*';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

##### 自定义实例默认配置

```typescript
// 可以创建时传入
const instance = axios.create({
  baseURL: 'https://www.xxx.com',
  headers: {
    common: {
      'Accept': 'application/json, test/plain, */*'
    },
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
});

// 也可以创建后修改
instance.defaults.baseURL = 'https://www.xxx.com';
instance.defaults.headers.common['Accept'] = 'application/json, test/plain, */*';
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

##### 配置优先顺序

发送请求时，会使用默认配置`defaults`和自定义配置`config`合并出请求配置`requestConfig`，然后用合并出的请求配置`requestConfig`去发送请求，多数情况下，后者优先于前者，具体合并策略可以参考 [mergeConfig.ts](https://github.com/early-autumn/axios-miniprogram/blob/master/src/helper/mergeConfig.ts) 的实现。



### `axios.getUri(config)`

根据传入的配置生成完整的`URL`。

```typescript
axios.defaults.baseURL = 'https://www.xxx.com';

// uri === 'https://www.xxx.com/test?id=1'
const uri = axios.getUri({
  url: '/test',
  params: { id: 1 }
});

// uri2 === 'https://www.yyy.com/test?id=1'
const uri2 = axios.getUri({
  baseURL: 'https://www.yyy.com',
  url: '/test',
  params: { id: 1 }
});
```

### `axios.create(config)`

创建一个`自定义实例`，传入的自定义配置`config`会和`axios`的默认配置`axios.defaults`合并成`自定义实例`的默认配置。

`自定义实例`拥有和`axios`相同的调用方式和请求方法别名。

```typescript
axios.defaults.baseURL = 'https://www.xxx.com';

const instance = axios.create({
  params: {
    id: 1
  }
});

// 最终请求的 URL 是这样的 => https://www.xxx.com/test?id=1
// https://www.xxx.com 来自 axios.defaults.baseURL
// /test 来自传入的 '/test'
// id=1 来自 instance.defaults.params
instance('/test');
instance.get('/test');
```

### `axios.Axios`

`axios.Axios`是一个类，其实`axios`就是`axios.Axios`类的实例改造而来的，`axios.create(config)`创建的也是`axios.Axios`的实例。

直接实例化`axios.Axios`可以得到一个`纯净的实例`，不能当函数调用，传入的自定义配置就是`纯净的实例`的默认配置，而不会像`axios.create(config)`一样去合并`axios`中的默认配置。

```typescript
axios.defaults.baseURL = 'https://www.xxx.com';

const instance = new axios.Axios({ 
  params: { value: '零污染' }
});

// 最终请求的 URL 是这样的 => /test?value=零污染
// /test 来自传入的 '/test'
// value=零污染 来自 instance.defaults.params
instance.get('/test');
```