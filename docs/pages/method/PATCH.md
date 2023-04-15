---
title: PATCH 请求
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
在 HTTP 协议中，请求方法 PATCH 用于对资源进行部分修改。

在 HTTP 协议中， PUT 方法已经被用来表示对资源进行整体覆盖，而 POST 方法则没有对标准的补丁格式的提供支持。不同于 PUT 方法，而与 POST 方法类似，PATCH 方法是非幂等的，这就意味着连续多个相同的请求会产生不同的效果。
:::

## 普通的 `PATCH` 请求

可以传递第一个参数 `url` 发送 `PATCH` 请求。

```ts
import axios from 'axios-miniprogram';

axios
  .patch('https://api.com/test')
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 携带数据的 `PATCH` 请求

也可以额外传递第二个参数 `data` 发送携带数据的 `PATCH` 请求。

```ts
import axios from 'axios-miniprogram';

axios
  .patch('https://api.com/test/:id', {
    id: 1,
    name: 'test',
  })
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 携带请求配置的 `PATCH` 请求

也可以额外传递第三个参数 `config` 发送携带请求配置的 `PATCH` 请求。

```ts
import axios from 'axios-miniprogram';

axios
  .patch(
    'https://api.com/test/:id',
    {
      id: 1,
      name: 'test',
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

<VPCompatibility tt='2.42.0' />
