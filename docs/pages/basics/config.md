---
title: 请求配置
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
用于自定义请求行为。
:::

## 通用属性

可以设置这些属性。

```ts
import axios from 'axios-miniprogram';

axios({
  // 开发者服务器接口基础地址
  baseURL: 'https://api.com',

  // 开发者服务器接口地址
  url: '/test',

  // 请求方法
  method: 'POST',

  // 请求参数
  params: {
    id: 1,
  },

  // 请求数据
  data: {
    name: 'test',
  },

  // 请求头
  headers: {
    'Content-Type': 'application/json',
  },

  // 返回的数据格式
  dataType: 'json',

  // 响应的数据类型
  responseType: 'text',

  // 超时时间，单位为毫秒
  timeout: 10000,

  // 上传
  upload: false,

  // 下载
  download: false,

  // 请求参数系列化函数
  paramsSerializer(params) {
    console.log(params);
  },

  // 转换请求数据
  transformRequest(data, headers) {
    console.log(data);
  },

  // 转换响应数据
  transformResponse(data, headers) {
    console.log(data);
  },

  // 监听上传进度
  onUploadProgress({ progress }) {
    console.log(progress);
  },

  // 监听下载进度
  onDownloadProgress({ progress }) {
    console.log(progress);
  },

  // 校验状态码
  validateStatus(status) {
    console.log(status);
  },

  // 异常处理
  errorHandler(error) {
    console.log(error);
  },

  // 适配器
  adapter(config) {
    console.log(config);
  },
})
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 平台属性

也可以设置平台特有属性，具体情况取决于平台特性。

微信小程序示例：

```ts
import axios from 'axios-miniprogram';

axios
  .request({
    // 开启 http2
    enableHttp2: false,

    // 开启 quic
    enableQuic: false,

    // 开启 cache
    enableCache: false,

    // 是否开启 HttpDNS 服务。如开启，需要同时填入 httpDNSServiceId 。
    enableHttpDNS: false,

    // HttpDNS 服务商 Id。
    httpDNSServiceId: '123',

    // 开启 transfer-encoding chunked。
    enableChunked: false,

    // wifi 下使用移动网络发送请求
    forceCellularNetwork: false,
  })
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

想要了解更多请自行参阅对应平台文档。

## 自定义属性

也可以设置自定义属性。

自定义属性可以根据需要随意设置。

```ts
import axios from 'axios-miniprogram';

axios
  .request({
    // 这是一个自定义配置
    user: '123',

    // 这也是一个自定义配置
    showLoading: true,
  })
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```
