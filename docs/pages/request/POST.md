---
title: POST 请求
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
HTTP POST 方法发送数据给服务器。请求主体的类型由 Content-Type 首部指定。
:::

## 普通的 `POST` 请求

可以传递第一个参数 `url` 发送 `POST` 请求。

```ts
import axios from 'axios-miniprogram';

axios
  .post('https://api.com/test')
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 携带数据的 `POST` 请求

也可以额外传递第二个参数 `data` 发送携带数据的 `POST` 请求。

```ts
import axios from 'axios-miniprogram';

axios
  .post('https://api.com/test', {
    name: 'test',
    password: '123456',
  })
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 携带请求配置的 `POST` 请求

也可以额外传递第三个参数 `config` 发送携带请求配置的 `POST` 请求。

```ts
import axios from 'axios-miniprogram';

axios
  .post(
    'https://api.com/test',
    {
      name: 'test',
      password: '123456',
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
