# axios-miniprogram

[![build status](https://travis-ci.com/zjx0905/axios-miniprogram.svg?branch=master)](https://travis-ci.org/zjx0905/axios-miniprogram)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Coverage Status](https://coveralls.io/repos/github/zjx0905/axios-miniprogram/badge.svg?branch=master)](https://coveralls.io/github/zjx0905/axios-miniprogram?branch=master)
[![npm version](https://badge.fury.io/js/axios-miniprogram.svg)](https://badge.fury.io/js/axios-miniprogram)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

## 安装

```bash
$ yarn add axios-miniprogram
```

或者

```bash
$ npm i axios-miniprogram
```

## 简介

小程序平台专用请求库，实现了 [axios](https://github.com/axios/axios) 大部分功能，用法只存在少许差异，如果您是 [axios](https://github.com/axios/axios) 的老用户，那么不需要学习就可以直接上手使用。

* 支持 微信小程序、支付宝小程序、百度小程序、字节跳动小程序、QQ 小程序、uniapp。
* 支持 `Typescript`，健全的类型系统，智能的 `IDE` 提示。
* 支持 `Promise`。
* 支持 拦截器。
* 支持 取消请求。
* 支持 自定义合法状态码。
* 支持 自定义参数序列化。
* 支持 自定义转换数据。
* 支持 自定义错误处理。
* 支持 自定义平台适配器

## 使用

### `axios(config)`

可以通过将相关配置传递给`axios`来发送请求。

```typescript
// 发送 GET 请求
axios({
  method: 'get',
  url: '/test',
  params: { test: 1 }
}).then((response) => {
  // 请求成功后做些什么
}).catch((error) => {
  // 请求失败后做些什么
});

// 发送 POST 请求
axios({
  method: 'post',
  url: '/test',
  data: { test: 1 }
}).then((response) => {
  // 请求成功后做些什么
}).catch((error) => {
  // 请求失败后做些什么
});
```

### `axios(url, config?)`

也可以通过直接把`url`传给`axios`来发送请求。

```typescript
// 默认发送 GET 请求
axios('/test/xxx').then((response) => {
  // 请求成功后做些什么
}).catch((error) => {
  // 请求失败后做些什么
});

// 发送 POST 请求
axios('/test/xxx', { method: 'post' }).then((response) => {
  // 请求成功后做些什么
}).catch((error) => {
  // 请求失败后做些什么
});
```

还可以使用请求方法的别名来简化请求。

* ##### axios.request(config)
* ##### axios.options(url, config?)
* ##### axios.get(url, params?, config?)
* ##### axios.head(url, params?, config?)
* ##### axios.post(url, data?, config?)
* ##### axios.put(url, data?, config?)
* ##### axios.delete(url, params?, config?)
* ##### axios.trace(url, config?)
* ##### axios.connect(url, config?) 


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

## 配置`config`

非全平台兼容的属性只会在平台支持的情况下生效。

|参数|类型|默认值|说明|全平台兼容|
|:-|:-|:-|:-|:-|
|adapter|Function|[查看](https://github.com/early-autumn/axios-miniprogram/blob/master/src/defaults.ts)|自定义适配器|是|
|baseURL|String| |基础地址|是|
|url|String| |请求地址|是|
|method|String|get|请求方法| |
|params|Object| |请求参数|是|
|data|String/Object/ArrayBuffer| |请求数据|是|
|headers|Object|[查看](https://github.com/early-autumn/axios-miniprogram/blob/master/src/defaults.ts)|请求头|是|
|validateStatus|Function|[查看](https://github.com/early-autumn/axios-miniprogram/blob/master/src/defaults.ts)|自定义合法状态码|是|
|paramsSerializer|Function| |自定义参数序列化|是|
|transformRequest|Function/Array<.Function>| |自定义转换请求数据|是|
|transformResponse|Function/Array<.Function>| |自定义转换响应数据|是|
|errorHandler|Function| |自定义错误处理|是|
|cancelToken|Object| |取消令牌|是|
|timeout|Number|10000|超时时间| |
|dataType|String|json|响应数据格式|是|
|responseType|String|text|响应数据类型|是|
|enableHttp2|Boolean|false|开启 http2| |
|enableQuic|Boolean|false|开启 quic| |
|enableCache|Boolean|false|开启 cache| |
|sslVerify|Boolean|true|验证 ssl 证书| |

#### `config.method`的合法值

可以使用大写，也可以使用小写。

|值|说明|全平台兼容|
|:-|:-|:-|
|OPTIONS| | |
|GET| |是|
|HEAD| | |
|POST| |是|
|PUT| |是|
|DELETE| |是|
|TRACE| | |
|CONNECT| | |

#### `config.dataType`的合法值

|值|说明|全平台兼容|
|:-|:-|:-|
|json|返回的数据为 JSON，返回后会对返回的数据进行一次 JSON.parse|是|
|其他|不对返回的内容进行 JSON.parse|是|

#### `config.responseType`的合法值                                                                                              

|值|说明|全平台兼容|
|:-|:-|:-|
|text|响应的数据为文本|是|
|arraybuffer|响应的数据为 ArrayBuffer|是|

#### 自定义合法状态码`config.validateStatus`

可以让请求按照您的要求成功或者失败。

```typescript
axios('/test', {
  validateStatus: function validateStatus(status) {
    // 这样，状态码在 200 到 400 之间都是请求成功
    return status >= 200 && status <  400;
  }
});
```

#### 自定义参数序列化`config.paramsSerializer`

可以使用自己的规则去序列化参数。

```typescript
axios('/test', {
  paramsSerializer: function paramsSerializer(params) {
    return qs.stringify(params, {arrayFormat: 'brackets'});
  }
});
```

#### 自定义转换数据

可以在请求发出之前转换请求数据，在请求成功之后转换响应数据。

```typescript
axios('/test', {
  transformRequest: [function transformRequest(data, headers) {
    // 转换请求数据
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    // 转换响应数据
    return data;
  }],
});
```

#### 自定义错误处理`config.errorHandler`

可以添加到默认配置中，统一处理错误。

```typescript
axios.defaults.errorHandler = function errorHandler(error) {
  // 做一些想做的事情
  return Promise.reject(error);
}

const instance = axios.create({
  errorHandler: function errorHandler(error) {
    // 做一些想做的事情
    return Promise.reject(error);
  }
});
```

也可以发送请求时通过自定义配置传入。

```typescript
axios('/test', {
  errorHandler: function errorHandler(error) {
    // 做一些想做的事情
    return Promise.reject(error);
  }
});
```

#### 自定义平台适配器`config.adapter`

您可以手动适配当前所处的平台。

```typescript
axios.defaults.adapter = function adapter(adapterConfig) {
  const {
    // 请求地址
    url,
    // 请求方法
    method,
    // 请求数据
    data,
    // 请求头 同 headers
    header,
    // 请求头 同 header
    headers,
    // 响应数据格式
    dataType,
    // 响应数据类型
    responseType,
    // 超时时间
    timeout,
    // 开启 http2
    enableHttp2,
    // 开启 quic
    enableQuic,
    // 开启 cache
    enableCache,
    // 验证 ssl 证书
    sslVerify,
    // 成功的回调函数
    success,
    // 失败的回调函数
    fail
  } = adapterConfig;

  // 在 adapterConfig 中选择您需要的参数发送请求
  return wx.request({
    url,
    method,
    data,
    header,
    success,
    fail
  });
}

// 如果 adapterConfig 的数据结构适用于当前平台，则可以。
axios.defaults.adapter = wx.request;
```

#### 默认配置`defaults`

##### 全局默认配置`axios.defaults`

```typescript
axios.defaults.baseURL = 'https://www.xxx.com';
axios.defaults.headers.common['Accept'] = 'application/json, test/plain, */*';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
```

##### 自定义实例默认配置

可以创建时传入。

```typescript
const instance = axios.create({
  baseURL: 'https://www.xxx.com',
  headers: {
    common: {
      'Accept': 'application/json, test/plain, */*'
    },
    post: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
  }
});
```

也可以创建后修改。

```typescript
instance.defaults.baseURL = 'https://www.xxx.com';
instance.defaults.headers.common['Accept'] = 'application/json, test/plain, */*';
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
```

##### 配置优先顺序

发送请求时，会使用默认配置`defaults`和自定义配置`config`合并出请求配置`requestConfig`，然后用合并出的请求配置`requestConfig`去发送请求，多数情况下，后者优先级要高于前者，具体合并策略可以参考 [mergeConfig.ts](https://github.com/early-autumn/axios-miniprogram/blob/master/src/core/mergeConfig.ts) 的实现。

## 响应体`response`

非全平台兼容的属性只会在平台支持的情况下生效。

|属性|类型|说明|全平台兼容|
|:-|:-|:-|:-|
|status|Number|状态码|是|
|statusText|String|状态文本|是|
|data|String/Object/ArrayBuffer|开发者服务器返回的数据|是|
|headers|Object|响应头|是|
|config|Object|Axios 请求配置|是|
|cookies|Array<.String>|开发者服务器返回的 cookies，格式为字符串数组| |
|profile|Object|网络请求过程中一些关键时间点的耗时信息| |


## API

### `axios.interceptors`

可以先拦截请求或响应，然后再由then或catch处理。

```typescript
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log('request');
  return config;
}, function (error) {
  //处理请求错误
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 请求成功后做些什么
  console.log('response');
  return response;
}, function (error) {
  // 处理响应错误
  return Promise.reject(error);
});

axios('/test').then(function (response){
  console.log('ok');
});

// log 'request' 'response' 'ok'
```

如果以后需要删除拦截器，则可以。

```typescript
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

还可以将拦截器添加到`axios`的`自定义实例`中。

```typescript
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

### `axios.CancelToken`

可以使用`CancelToken`取消已经发出的请求。

```typescript
let cancel;

axios('/test', {
  cancelToken: new axios.CancelToken(function (c){
    cancel = c;
  })
});

cancel('取消请求');
```

还可以使用`CancelToken.source`工厂方法创建`CancelToken`。

```typescript
const source = axios.CancelToken.source();

axios('/test', {
  cancelToken: source.token
});

source.cancel('取消请求');
```

### `axios.isCancel`

可以判断当前错误是否来自取消请求

```typescript
axios('/test').catch((error) => {
  if(axios.isCancel(error)){
    // 请求被取消了
  }
});
```

### `axios.getUri(config)`

根据配置中的`url`和`params`生成一个`URI`。

```typescript 
// uri === '/test?id=1'
const uri = axios.getUri({
  url: '/test',
  params: { id: 1 }
});
```

### `axios.create(defaults)`

创建一个`自定义实例`，传入的自定义默认配置`defaults`会和`axios`的默认配置`axios.defaults`合并成`自定义实例`的默认配置。

`自定义实例`拥有和`axios`相同的调用方式和请求方法的别名。

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

`axios.Axios`是一个类，其实`axios`就是`axios.Axios`类的实例改造而来的，`axios.create(defaults)`创建的也是`axios.Axios`的实例。

直接实例化`axios.Axios`可以得到一个`原始实例`，不能当函数调用，传入的自定义配置就是`原始实例`的默认配置，而不会像`axios.create(defaults)`一样去合并`axios`中的默认配置。

```typescript
axios.defaults.baseURL = 'https://www.xxx.com';

const instance = new axios.Axios({ 
  params: { value: 123 }
});

// 最终请求的 URL 是这样的 => /test?value=123
// /test 来自传入的 '/test'
// value=123 来自 instance.defaults.params
instance.get('/test');
```

## 执行流程

```typescript
axios('/test').then().catch();

// 请求成功
// axios => axios.interceptors.request => config.transformRequest => config.paramsSerializer => config.adapter => config.validateStatus => config.transformResponse => axios.interceptors.response => then

// 请求失败
// axios => axios.interceptors.request => config.transformRequest => config.paramsSerializer => config.adapter => config.validateStatus => config.transformResponse => config.errorHandler => axios.interceptors.response => catch
```
