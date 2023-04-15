---
title: CONNECT 请求
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
在 HTTP 协议中，CONNECT 方法可以开启一个客户端与所请求资源之间的双向沟通的通道。它可以用来创建隧道（tunnel）。
:::

## 普通的 `CONNECT` 请求

您可以传递第一个参数 `url` 发送 `CONNECT` 请求。

```ts
import axios from 'axios-miniprogram';

axios
  .connect('https://api.com/test')
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 携带自定义配置的 `CONNECT` 请求

您也可以额外传递第二个参数 `config` 发送携带自定义配置的 `CONNECT` 请求。

```ts
import axios from 'axios-miniprogram';

axios
  .connect('https://api.com/test', {
    headers: {
      Connection: 'Keep-Alive',
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

<VPCompatibility wx swan='仅 Android 支持' tt='1.0.0' qq />
