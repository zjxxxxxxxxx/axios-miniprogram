---
title: 创建实例
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
创建新的实例。
:::

## 创建实例

可以使用 `axios.create(config)` 创建新的实例。

全局默认配置 `axios.defaults` 和创建实例时传入的配置 `config` 将会按优先级[合并](/basics/defaults#配置合并策略)成实例默认配置 `instance.defaults`。

```ts
import axios from 'axios-miniprogram';

const instance = axios.create({
  baseURL: 'https://api2.com',
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
```

## 默认配置

可以设置配置项默认值。

```ts
import axios from 'axios-miniprogram';

const instance = axios.create({
  baseURL: 'https://api2.com',
});

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.timeout = 1000;
```

## 添加拦截器

可以添加实例的[请求拦截器](/advanced/request-interceptor)和[响应拦截器](/advanced/response-interceptor)。

```ts
import axios from 'axios-miniprogram';

const instance = axios.create({
  baseURL: 'https://api2.com',
});

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 在 then 之前做些什么
    return response;
  },
  function (error) {
    // 在 catch 之前做些什么
    return Promise.reject(error);
  },
);
```

## 扩展实例

可以基于实例[扩展实例](/advanced/extend)。

实例默认配置 `parent.defaults` 和派生领域时传入的配置 `config` 将会按优先级[合并](/basics/defaults#配置合并策略)成新实例默认配置 `child.defaults`。

```ts
import axios from 'axios-miniprogram';

const parent = axios.create({
  baseURL: 'https://api2.com',
});

const child = instance.extend({
  baseURL: 'user',
});

// 请求的服务端地址 https://api2.com/user
child('/');
```

## 使用

使用方式和 `axios` 完全一致。

```ts
import axios from 'axios-miniprogram';

const instance = axios.create({
  baseURL: 'https://api.com',
});

instance('test')
  .then((response) => {
    // 请求成功后做些什么
  })
  .catch((error) => {
    // 请求失败后做些什么
  });

instance('test', {
  method: 'POST',
})
  .then((response) => {
    // 请求成功后做些什么
  })
  .catch((error) => {
    // 请求失败后做些什么
  });

instance({
  url: 'test',
  method: 'POST',
})
  .then((response) => {
    // 请求成功后做些什么
  })
  .catch((error) => {
    // 请求失败后做些什么
  });
```

也可以使用请求方法简化请求。

- [instance.request(url, config?) | instance.request(config)](/basics/request)
- [instance.options(url, config?)](/method/OPTIONS)
- [instance.get(url, params?, config?)](/method/GET)
- [instance.head(url, params?, config?)](/method/HEAD)
- [instance.post(url, data?, config?)](/method/POST)
- [instance.put(url, data?, config?)](/method/PUT)
- [instance.patch(url, data?, config?)](/method/PATCH)
- [instance.delete(url, params?, config?)](/method/DELETE)
- [instance.trace(url, config?)](/method/TRACE)
- [instance.connect(url, config?)](/method/CONNECT)
