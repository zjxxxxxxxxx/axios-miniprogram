---
title: 快速上手
sidebarDepth: 1
lastUpdated: true
sitemap:
  priority: 0.8
---

# 快速上手

## 安装

:::: code-group

```sh [NPM]
npm install -D axios-miniprogram
```

```sh [YARN]
yarn add -D axios-miniprogram
```

```sh [PNPM]
pnpm install -D axios-miniprogram
```

::::

## 使用

### 如何引入

```typescript
// esm
import axios from 'axios-miniprogram';
// cjs
const axios = require('axios-miniprogram');
// 使用
axios('/user');
```

### `axios(config)`

可以通过将相关配置传递给`axios`来发送请求。

```typescript
// 发送 GET 请求
axios({
  url: '/user',
  method: 'get',
  params: {
    id: 1,
  },
})
  .then((response) => {
    // 请求成功后做些什么
  })
  .catch((error) => {
    // 请求失败后做些什么
  });

// 发送 POST 请求
axios({
  url: '/user',
  method: 'post',
  data: {
    id: 1,
  },
})
  .then((response) => {
    // 请求成功后做些什么
  })
  .catch((error) => {
    // 请求失败后做些什么
  });
```

### `axios(url, config?)`

也可以通过直接把`url`传给`axios`来发送请求。

```typescript
// 默认发送 GET 请求
axios('/user')
  .then((response) => {
    // 请求成功后做些什么
  })
  .catch((error) => {
    // 请求失败后做些什么
  });

// 发送 POST 请求
axios('/user', {
  method: 'post',
})
  .then((response) => {
    // 请求成功后做些什么
  })
  .catch((error) => {
    // 请求失败后做些什么
  });
```

还可以使用请求方法的别名来简化请求。

- ##### axios.request(config)
- ##### axios.options(url, config?)
- ##### axios.get(url, params?, config?)
- ##### axios.head(url, params?, config?)
- ##### axios.post(url, data?, config?)
- ##### axios.put(url, data?, config?)
- ##### axios.delete(url, params?, config?)
- ##### axios.trace(url, config?)
- ##### axios.connect(url, config?)

常用例子，其他同理：

```typescript
// 发送 GET 请求
axios.get('/user');

// 携带参数
axios.get('/user', {
  test: 1,
});

// 携带额外配置
axios.get(
  '/user',
  {
    id: 1,
  },
  {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  },
);

// 发送 POST 请求
axios.post('/user');

// 携带数据
axios.post('/user', {
  id: 1,
});

// 携带额外配置
axios.post(
  '/user',
  {
    id: 1,
  },
  {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  },
);
```

## 动态 URL

您可以使用动态 URL 提高 RESTful API 的书写体验。

```typescript
axios.get('/user/:id', {
  id: 1,
});
```

## 响应体`response`

非全平台兼容的属性只会在平台支持的情况下生效。

| 属性       | 类型                      | 说明                                         | 全平台兼容 |
| :--------- | :------------------------ | :------------------------------------------- | :--------- |
| status     | Number                    | 状态码                                       | 是         |
| statusText | String                    | 状态文本                                     | 是         |
| data       | String/Object/ArrayBuffer | 开发者服务器返回的数据                       | 是         |
| headers    | Object                    | 响应头                                       | 是         |
| config     | Object                    | Axios 请求配置                               | 是         |
| cookies    | Array<.String>            | 开发者服务器返回的 cookies，格式为字符串数组 |            |
| profile    | Object                    | 网络请求过程中一些关键时间点的耗时信息       |            |
