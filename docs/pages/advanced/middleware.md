---
title: 中间件
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
基于洋葱模型的中间件。
:::

## 前言

如果您了解或者使用过[koa](https://github.com/koajs/koa)，相信您一定十分了解什么是洋葱模型，中间件该怎么写。

中间件是一个异步函数，接收 `context` 和 `next` 两个参数。

`context` 是一个对象，提供了 `req` 对象和 `res` 对象作为其组成部分。

- `context.req`：请求配置。
- `context.res`：请求完成后服务端返回的响应体，它的初始值是 `null`，请求完成之后才能对其进行操作。

`next` 是一个异步函数，如果希望程序继续执行后续逻辑，请手动调用它。

```ts
async (ctx, next) => {
  // 请求发送前
  const {
    // 请求配置
    req,

    // 此时为 null
    res,
  } = ctx;

  // 调用 next 继续执行后续逻辑，最终发送请求
  await next();

  // 请求完成后
  const {
    // 请求配置
    req,

    // 服务端返回的响应体
    res,
  } = ctx;
};
```

## 全局中间件

可以添加全局中间件，对发送的每个请求生效。

```ts
import axios from 'axios-miniprogram';

// use 会返回 this，可以链式添加多个
axios
  .use(async (ctx, next) => {
    console.log('1');
    await next();
    console.log('4');
  })
  .use(async (ctx, next) => {
    console.log('2');
    await next();
    console.log('3');
  });

// 洋葱模型执行顺序
// 1 -> 2 -> /test -> 3 -> 4
axios('/test');
```

## 实例中间件

可以为实例添加中间件，对实例发送的每个请求生效。

```ts
import axios from 'axios-miniprogram';

const instance = axios.create({
  baseURL: 'https://api.com',
});

instance.use(async (ctx, next) => {
  console.log('instance request');
  await next();
  console.log('instance response');
});

// instance request -> https://api.com/test -> instance response
instance('https://api.com/test');
```

## 扩展实例中间件

可以为扩展实例添加中间件，扩展实例同时也可以复用父级中间件。

```ts
import axios from 'axios-miniprogram';

axios.defaults.baseURL = 'https://api.com';

axios.use(async (ctx, next) => {
  console.log('axios request');
  await next();
  console.log('axios response');
});

const instance = axios.extend({
  baseURL: '/test',
});

instance.use(async (ctx, next) => {
  console.log('instance request');
  await next();
  console.log('instance response');
});

// 复用父级中间件
// axios request -> instance request -> https://api.com/test/user -> instance response -> axios response
instance('/user');
```
