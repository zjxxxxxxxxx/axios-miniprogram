---
title: HEAD 请求
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
HTTP HEAD 方法请求资源的头部信息，并且这些头部与 HTTP GET 方法请求时返回的一致。该请求方法的一个使用场景是在下载一个大文件前先获取其大小再决定是否要下载，以此可以节约带宽资源。
:::

## 普通的 `HEAD` 请求

可以传递第一个参数 `url` 发送 `HEAD` 请求。

```ts
import axios from 'axios-miniprogram';

axios
  .head('https://api.com/test')
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 携带参数的 `HEAD` 请求

也可以额外传递第二个参数 `params` 发送携带参数的 `HEAD` 请求。

```ts
import axios from 'axios-miniprogram';

axios
  .head('https://api.com/test/:id', {
    id: 1,
  })
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 携带请求配置的 `HEAD` 请求

也可以额外传递第三个参数 `config` 发送携带请求配置的 `HEAD` 请求。

```ts
import axios from 'axios-miniprogram';

axios
  .head(
    'https://api.com/test/:id',
    {
      id: 1,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 兼容性

<VPCompatibility wx swan tt='1.0.0' qq tt2 />
