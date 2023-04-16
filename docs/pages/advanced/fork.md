---
title: 派生领域
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
派生新的领域管理 `URL` 简化请求。

`defaults` 和派生 `domain` 时传入的 `config` 将会按优先级合并成 `domain.defaults`。

如果 `config.baseURL` 是一个相对地址，将会和 `defaults.baseURL` 组合成完整的服务端地址。

[合并策略](/basics/defaults#合并策略)
:::

## 派生领域

可以传入 config 派生领域。

```ts
import axios from 'axios-miniprogram';

axios.defaults.baseURL = 'https://api.com';

const domain = axios.fork({
  baseURL: 'user',
  headers: {
    common: {
      ['Content-Type']: 'application/json',
    },
    post: {
      ['Content-Type']: 'application/x-www-form-urlencoded',
    },
  },
  timeout: 1000,
});

// 请求的服务端地址 https://api.com/uesr
domain.get('/');
```

也可以使用绝对路径 `config.baseURL` 派生领域。

```ts
import axios from 'axios-miniprogram';

axios.defaults.baseURL = 'https://api.com';

const domain = axios.fork({
  baseURL: 'https://api2.com/user',
  headers: {
    common: {
      ['Content-Type']: 'application/json',
    },
    post: {
      ['Content-Type']: 'application/x-www-form-urlencoded',
    },
  },
  timeout: 1000,
});

// 请求的服务端地址 https://api2.com/uesr
domain.get('/');
```

## 默认配置

可以设置 `domain.defaults` 属性默认值。

```ts
import axios from 'axios-miniprogram';

axios.defaults.baseURL = 'https://api.com';

const domain = axios.fork({
  baseURL: 'user',
});

domain.defaults.headers.common['Content-Type'] = 'application/json';
domain.defaults.timeout = 1000;
```

## 拦截器

基于 `axios` 派生出的 `domain`，在发送请求时会使用 `axios` 的拦截器。

基于 `instance` 派生出的 `domain`，在发送请求时会使用 `instance` 的拦截器。

目前上不支持为 `domain` 单独添加拦截器。

## 使用

可以使用请求方法发送请求。

```ts
import axios from 'axios-miniprogram';

axios.defaults.baseURL = 'https://api.com';

const domain = axios.fork({
  baseURL: 'user',
});

// 请求的服务端地址 https://api.com/uesr/1
domain
  .get('/:id', {
    id: 1,
  })
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });

// 请求的服务端地址 https://api.com/uesr
domain
  .post('/', {
    id: 1,
    name: 'user',
  })
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });

// 请求的服务端地址 https://api.com/uesr/1
domain
  .put('/:id', {
    name: 'user',
  })
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });

// 请求的服务端地址 https://api.com/uesr/1
domain
  .delete('/:id', {
    id: 1,
  })
  .then((response) => {
    // 成功之后做些什么
  })
  .catch((error) => {
    // 失败之后做些什么
  });
```

- [domain.request(url, config?) | instance.request(config)](/basics/request)
- [domain.options(url, config?)](/method/OPTIONS)
- [domain.get(url, params?, config?)](/method/GET)
- [domain.head(url, params?, config?)](/method/HEAD)
- [domain.post(url, data?, config?)](/method/POST)
- [domain.put(url, data?, config?)](/method/PUT)
- [domain.patch(url, data?, config?)](/method/PATCH)
- [domain.delete(url, params?, config?)](/method/DELETE)
- [domain.trace(url, config?)](/method/TRACE)
- [domain.connect(url, config?)](/method/CONNECT)
