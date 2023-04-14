---
title: OPTIONS 请求
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
HTTP OPTIONS 方法用于获取目的资源所支持的通信选项。客户端可以对特定的 URL 使用 OPTIONS 方法，也可以对整站（通过将 URL 设置为“\*”）使用该方法。
:::

## 普通的 `OPTIONS` 请求

您可以传入第一个参数 `url` 发送 `OPTIONS` 请求。

```ts
import axios from 'axios-miniprogram';

axios
  .options('https://api.com/test')
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 携带自定义配置的 `OPTIONS` 请求

您也可以额外传入第二个参数 `config` 发送携带自定义配置的 `OPTIONS` 请求。

```ts
import axios from 'axios-miniprogram';

axios
  .options('https://api.com/test', {
    headers: {
      Accept: '*/*',
    },
  })
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 兼容性

<VPCompatibility wx swan tt='1.0.0' qq tt2 />