---
title: 派生领域
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
派生新的领域简化 `URL`。
:::

::: warning 注意
该接口即将废弃，请使用功能更强的[扩展实例](./extend)。
:::

## 派生领域

可以基于 `axios` 派生领域，配置项 `baseURL` 传相对地址时会和 `axios.defaults.baseURL` 一起组合成完整的服务端地址。

全局默认配置 `axios.defaults` 和派生领域时传入的配置 `config` 将会按优先级[合并](/basics/defaults#配置合并策略)成领域默认配置 `domain.defaults`。

```ts
import axios from 'axios-miniprogram';

axios.defaults.baseURL = 'https://api.com';

// 相对地址会进行组合
// baseURL 最终结果为 https://api.com/uesr
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

// 绝对地址会直接使用
// baseURL 最终结果为 https://api2.com/user
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
```

## 默认配置

可以设置配置项默认值。

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

可以使用父级的拦截器，但不支持为领域单独添加拦截器。

基于 axios 派生领域。

```ts
import axios from 'axios-miniprogram';

// 请求拦截器
axios.interceptors.request.use(
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
axios.interceptors.response.use(
  function (response) {
    // 在 then 之前做些什么
    return response;
  },
  function (error) {
    // 在 catch 之前做些什么
    return Promise.reject(error);
  },
);

const domain = axios.fork({
  baseURL: 'test',
});

// 发送请求时会使用 axios 的请求拦截器和响应拦截器
domain.get('/');
```

基于实例派生领域。

```ts
import axios from 'axios-miniprogram';

const instance = axios.create({
  baseURL: 'https://api.com',
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

const domain = instance.fork({
  baseURL: 'test',
});

// 发送请求时会使用 instance 的请求拦截器和响应拦截器
domain.get('/');
```

## 使用方式

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

- [domain.request(url, config?) | domain.request(config)](/basics/request)
- [domain.options(url, config?)](/method/OPTIONS)
- [domain.get(url, params?, config?)](/method/GET)
- [domain.head(url, params?, config?)](/method/HEAD)
- [domain.post(url, data?, config?)](/method/POST)
- [domain.put(url, data?, config?)](/method/PUT)
- [domain.patch(url, data?, config?)](/method/PATCH)
- [domain.delete(url, params?, config?)](/method/DELETE)
- [domain.trace(url, config?)](/method/TRACE)
- [domain.connect(url, config?)](/method/CONNECT)
