---
title: GET 请求
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
HTTP GET 方法请求指定的资源。使用 GET 的请求应该只用于获取数据。
:::

## 普通的 `GET` 请求

可以传递第一个参数 `url` 发送 `GET` 请求。

```ts
import axios from 'axios-miniprogram';

axios
  .get('https://api.com/test')
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 携带参数的 `GET` 请求

也可以额外传递第二个参数 `params` 发送携带参数的 `GET` 请求。

```ts
import axios from 'axios-miniprogram';

axios
  .get('https://api.com/test/:id', {
    id: 1,
  })
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 携带请求配置的 `GET` 请求

也可以额外传递第三个参数 `config` 发送携带请求配置的 `GET` 请求。

```ts
import axios from 'axios-miniprogram';

axios
  .get(
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

<VPCompatibility wx my swan jd tt='1.0.0' qq dd tt2 ks />
