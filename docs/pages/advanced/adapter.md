---
title: 平台适配器
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
用于支持更多小程序平台或小程序框架。

适配器是一个函数，它可以接收 `config` 参数。
:::

## 基本配置

可以接收基本配置。

```ts
import axios from 'axios-miniprogram';

axios.defaults.adapter = (config) => {
  // 配置项
  const {
    // 请求类型
    // 'request' | 'upload' | 'download'
    type,

    // 开发者服务器接口地址
    url,

    // HTTP 请求方法
    method,

    // 请求参数
    params,

    // 请求数据
    data,

    // 请求头
    headers,

    // 返回的数据格式
    dataType,

    // 响应的数据类型
    responseType,

    // 超时时间
    timeout,

    // 成功的回调
    success,

    // 失败的回调
    fail,
  } = config;
};
```

## 其他配置

可以接收任意多个其他配置。

```ts
import axios from 'axios-miniprogram';

axios.defaults.adapter = (config) => {
  const {
    // 其他配置
    other1,

    // 其他配置
    other2,
  } = config;
};

axios('https://api.com', {
  other1: true,
  other2: true,
});
```

## 实现一个适配器

适配的本质是对配置项进行转换，甚至可以零逻辑完成适配。

这里用适配 uni-app 举例，适配其他平台其实大同小异。

```ts
import axios from 'axios-miniprogram';

// 适配器
axios.defaults.adapter = (config) => {
  // 可以先看看 config 上都有哪些属性
  console.log(config);

  // 开始适配不同类型的请求
  switch (config.type) {
    case 'request':
      // 适配数据请求
      return uni.request({
        url: config.url,
        data: config.data,
        header: config.headers,
        method: config.method,
        timeout: config.timeout,
        dataType: config.dataType,
        responseType: config.responseType,
        sslVerify: config.sslVerify,
        withCredentials: config.withCredentials,
        firstIpv4: config.firstIpv4,
        enableHttp2: config.enableHttp2,
        enableQuic: config.enableQuic,
        enableCache: config.enableCache,
        enableHttpDNS: config.enableHttpDNS,
        httpDNSServiceId: config.httpDNSServiceId,
        enableChunked: config.enableChunked,
        forceCellularNetwork: config.forceCellularNetwork,
        enableCookie: config.enableCookie,
        cloudCache: config.cloudCache,
        defer: config.defer,
        success: (response) => {
          config.success({
            // 状态码
            // 默认值：200
            status: response.statusCode,

            // 响应头
            // 默认值：{}
            headers: response.header,

            // 响应数据
            data: response.data,

            // cookie 列表
            cookies: response.cookies,
          });
        },
        fail: (error) => {
          config.fail({
            // 状态码
            // 默认值：400
            status: 400,

            // 响应头
            // 默认值：{}
            headers: {},

            // 响应数据
            // 平台 api 错误 error 通常是一个包含 errMsg 属性的对象
            data: error,
          });
        },
      });
    case 'upload':
      // 适配上传文件
      const { files, fileType, file, filePath, name, ...formData } =
        config.data;
      return uni.uploadFile({
        url: config.url,
        files,
        fileType,
        file,
        filePath,
        name,
        formData,
        header: config.headers,
        timeout: config.timeout,
        success: (response) => {
          config.success({
            // 状态码
            // 默认值：200
            status: response.statusCode,

            // 响应头
            // 默认值：{}
            headers: response.header,

            // 响应数据
            data: response.data,
          });
        },
        fail: (error) => {
          config.fail({
            // 状态码
            // 默认值：400
            status: 400,

            // 响应头
            // 默认值：{}
            headers: {},

            // 响应数据
            // 平台 api 错误 error 通常是一个包含 errMsg 属性的对象
            data: error,
          });
        },
      });
    case 'download':
      // 适配下载文件
      return uni.downloadFile({
        url: config.url,
        filePath: config.params?.filePath,
        header: config.headers,
        timeout: config.timeout,
        success: (response) => {
          config.success({
            // 状态码
            // 默认值：200
            status: response.statusCode,

            // 响应头
            // 默认值：{}
            headers: response.header,

            // 响应数据
            data: {
              filePath: response.filePath,
              tempFilePath: response.tempFilePath,
            },
          });
        },
        fail: (error) => {
          config.fail({
            // 状态码
            // 默认值：400
            status: 400,

            // 响应头
            // 默认值：{}
            headers: {},

            // 响应数据
            // 平台 api 错误 error 通常是一个包含 errMsg 属性的对象
            data: error,
          });
        },
      });
  }
};
```

## 使用 `createAdapter` 创建适配器

可以使用 `createAdapter` 简化适配流程。

直接使用可以完美适配小程序平台，但不能保证完美适配小程序以外的其他平台，如 App、H5。

```ts
import axios from 'axios-miniprogram';

axios.defaults.adapter = axios.createAdapter({
  request: uni.request,
  upload: uni.uploadFile,
  download: uni.downloadFile,
});
```

也可以进一步抹平存在差异的部分，实现完美适配全平台。

```ts
import axios from 'axios-miniprogram';

axios.defaults.adapter = axios.createAdapter({
  request: uni.request,
  upload: (config) => {
    // 其实差异只有一点点，抹平可以很轻易~
    const {
      // 需要上传的文件列表
      // App、H5（ 2.6.15+）
      files,

      // 要上传的文件对象
      // 仅 H5（2.6.15+）支持
      file,

      ...formData
    } = config.formData;

    return uni.uploadFile({
      ...config,
      files,
      file,
      formData,
    });
  },
  download: uni.downloadFile,
});
```
