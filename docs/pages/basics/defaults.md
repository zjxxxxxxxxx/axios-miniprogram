---
title: 默认配置
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
默认配置 `defaults` 会作用于每个请求。

[合并策略](/basics/defaults#合并策略)
:::

## 默认值

在不更改 `defaults` 的情况下，它依然会存在一些默认值，在 [defaults.ts](https://github.com/zjx0905/axios-miniprogram/blob/main/src/defaults.ts) 中定义，大概长下面这样。

```ts
{
  // 适配器，在支持的平台中有值。
  // 对于不支持平台而言，此值始终为 undefined，需要您手动适配。
  adapter: getAdapterDefault(),

  // 请求头
  headers: {
    // 通用请求头
    common: {
      Accept: 'application/json, text/plain, */*',
    },
    options: {}, // OPTIONS 方法请求头
    get: {}, // GET 方法请求头
    head: {}, // HEAD 方法请求头
    post: {}, // POST 方法请求头
    put: {}, // PUT 方法请求头
    patch: {}, // PATCH 方法请求头
    delete: {}, // DELETE 方法请求头
    trace: {}, // TRACE 方法请求头
    connect: {}, // CONNECT 方法请求头
  },

  // 校验状态码
  validateStatus(status: number): boolean {
    return status >= 200 && status < 300;
  },

  // 返回的数据格式
  dataType: 'json',

  // 响应的数据类型
  responseType: 'text',

  // 超时时长
  timeout: 10000,
}
```

## 设置属性

可以给属性设置默认值。

部分示例：

```ts
import axios from 'axios-miniprogram';

// 基础服务器地址
axios.defaults.baseURL = 'https://api.com';

// 通用请求头
axios.defaults.headers.common['Content-Type'] = 'application/json';

// POST 方法请求头
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

// 超时时间
axios.defaults.timeout = '60000';

// 校验状态码
axios.defaults.validateStatus = (status) => {
  return status === 200;
};

// 错误处理
axios.defaults.errorHandler = (error) => {
  console.log('出错了');
};

// 监听上传进度
axios.defaults.onUploadProgress = (event) => {
  console.log('上传中：' + event.progress);
};
```

## 设置平台属性

也可以给平台特有属性设置默认值，具体情况取决于平台特性。

微信小程序示例：

```ts
import axios from 'axios-miniprogram';

// 开启 http2
axios.defaults.enableHttp2 = true;

// 开启 quic
axios.defaults.enableQuic = true;

// 开启 cache
axios.defaults.enableCache = true;

// 开启 HttpDNS 服务。
axios.defaults.enableHttpDNS = true;

// HttpDNS 服务商 Id。
axios.defaults.httpDNSServiceId = '123';

// wifi 下使用移动网络发送请求
axios.defaults.forceCellularNetwork = false;
```

想要了解更多请自行参阅对应平台文档。

## 设置自定义属性

也可以给自定义属性设置默认值，从而实现一些自定义功能。

```ts
import axios from 'axios-miniprogram';

// 出错时显示错误信息
axios.defaults.showError = true;

// 错误处理
axios.defaults.errorHandler = (error) => {
  if (axios.isAxiosError(error)) {
    // 显示错误信息
    if (error.config.showError) {
      wx.showToast({
        title: error.response.data.errMsg,
      });
    }
  }
};

// 请求时自动 loading
axios.defaults.showLoading = true;

// 请求拦截器
axios.interceptors.request.use((config) => {
  // 自动显示 loading
  if (config.showLoading) {
    wx.showLoading();
  }
  return config;
});

// 响应拦截器
axios.interceptors.response.use((response) => {
  // 自动隐藏 loading
  if (response.config.showLoading) {
    wx.hideLoading();
  }
  return response;
});
```

## 合并策略

`defaults` 和 `config` 将会按优先级进行合并。

其中 `url/method/data/upload/download` 只从 `config` 取值，`headers/params` 进行深度合并，其余属性则会优先从 `config` 取值。

具体合并策略请参阅 [mergeConfig.ts](https://github.com/zjx0905/axios-miniprogram/blob/main/src/core/mergeConfig.ts) 。
