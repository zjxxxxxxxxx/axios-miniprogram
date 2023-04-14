---
title: DELETE 请求
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
HTTP DELETE 请求方法用于删除指定的资源。
:::

## 普通的 `DELETE` 请求

您可以传入第一个参数 `url` 发送 `DELETE` 请求。

```ts
import axios from 'axios-miniprogram';

axios
  .delete('https://api.com/test')
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 携带参数的 `DELETE` 请求

您也可以额外传入第二个参数 `params` 发送携带参数的 `DELETE` 请求。

```ts
import axios from 'axios-miniprogram';

axios
  .delete('https://api.com/test/:id', {
    id: 1,
  })
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 携带自定义配置的 `DELETE` 请求

您也可以额外传入第三个参数 `config` 发送携带自定义配置的 `DELETE` 请求。

```ts
import axios from 'axios-miniprogram';

axios
  .delete(
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

<VPCompatibility wx my swan tt='1.0.0' qq tt2 />
