---
title: TRACE 请求
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
HTTP TRACE 方法实现沿通向目标资源的路径的消息环回（loop-back）测试，提供了一种实用的 debug 机制。
:::

## 普通的 `TRACE` 请求

您可以传递第一个参数 `url` 发送 `TRACE` 请求。

```ts
import axios from 'axios-miniprogram';

axios
  .trace('https://api.com/test')
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 携带自定义配置的 `TRACE` 请求

您也可以额外传递第二个参数 `config` 发送携带自定义配置的 `TRACE` 请求。

```ts
import axios from 'axios-miniprogram';

axios
  .trace('https://api.com/test', {
    headers: {
      'Content-Type': 'message/http',
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
