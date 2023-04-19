---
title: 响应体
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
`response` 是响应正文。返回的数据类型为 `String/Object/ArrayBuffer`。这取决于请求配置的 `responseType` 属性。
:::

## 通用属性

请求成功返回的 `response` 带有这些属性。

```ts
import axios from 'axios-miniprogram';

axios('https//api.com')
  .then((response) => {
    const {
      // 开发者服务器返回的 HTTP 状态码
      status,

      // 状态文本
      statusText,

      // 开发者服务器返回的数据
      data,

      // 开发者服务器返回的响应头
      headers,

      // 请求配置
      config,

      // 请求任务
      request,
    } = response;
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 平台属性

请求成功返回的 `response` 可能带有平台特有的属性，具体情况取决于平台特性。

微信小程序示例:

```ts
import axios from 'axios-miniprogram';

axios('https://api.com')
  .then((response) => {
    const {
      // 开发者服务器返回的 cookies，格式为字符串数组
      cookies,

      // 网络请求过程中一些调试信息
      profile,
    } = response;
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

想要了解更多请自行参阅对应平台文档。
