---
title: 动态地址
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
简化地址参数的设置方式。
:::

## 设置请求参数

可以设置请求参数，最终会从请求参数中获取对应的值。

::: warning 注意
获取到值后会从请求参数中删除对应的值。
:::

```ts
import axios from 'axios-miniprogram';

// 请求的服务端地址 https://api.com/1
// 获取到 id 之后，会从 params 中删除 id
axios('https://api.com/:id', {
  params: {
    id: 1,
  },
})
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 设置请求数据

可以设置请求数据，最终会从请求数据中获取对应的值。

```ts
import axios from 'axios-miniprogram';

// 请求的服务端地址 https://api.com/1
// 获取到 id 之后，不会从 data 中删除 id
axios('https://api.com/:id', {
  method: 'POST',
  data: {
    id: 1,
  },
})
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

## 同时设置请求参数和请求数据

可以同时设置请求参数和请求数据，会优先从请求参数中获取对应的值。

```ts
import axios from 'axios-miniprogram';

// 请求的服务端地址 https://api.com/1
axios('https://api.com/:id', {
  method: 'POST',
  params: {
    id: 1,
  },
  data: {
    id: 2,
  },
})
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });

// 请求的服务端地址 https://api.com/1/test
axios('https://api.com/:id/:name', {
  method: 'POST',
  params: {
    id: 1,
  },
  data: {
    name: 'test',
  },
})
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```
