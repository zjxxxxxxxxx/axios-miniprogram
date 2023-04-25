---
title: 扩展实例
---

# {{ $frontmatter.title }}

::: tip {{ $frontmatter.title }}
扩展新的实例，复用拦截器、中间件。
:::

## 扩展实例

可以基于 `axios` 扩展实例，配置项 `baseURL` 传相对地址时会和 `axios.defaults.baseURL` 一起组合成完整的服务端地址。

全局默认配置 `axios.defaults` 和扩展实例时传入的配置 `config` 将会按优先级[合并](/basics/defaults#配置合并策略)成实例默认配置 `instance.defaults`。

```ts
import axios from 'axios-miniprogram';

axios.defaults.baseURL = 'https://api.com';

// 相对地址会进行组合
// baseURL 最终结果为 https://api.com/uesr
const instance = axios.extend({
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
const instance = axios.extend({
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

const instance = axios.extend({
  baseURL: 'user',
});

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.timeout = 1000;
```

## 添加拦截器

可以添加实例的[请求拦截器](/advanced/request-interceptor)和[响应拦截器](/advanced/response-interceptor)。

```ts
import axios from 'axios-miniprogram';

const instance = axios.extend({
  baseURL: 'test',
});

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    console.log('instance request');
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
    console.log('instance response');
    return response;
  },
  function (error) {
    // 在 catch 之前做些什么
    return Promise.reject(error);
  },
);

// instance request -> instance response
instance('/');
```

也可以复用拦截器。

```ts
import axios from 'axios-miniprogram';

axios.defaults.baseURL = 'https://api.com';

const parent = axios.extend({
  baseURL: '/parent',
});
const child = parent.extend({
  baseURL: '/child',
});

// 请求拦截器
axios.interceptors.request.use(
  function (config) {
    console.log('axios request');
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
    console.log('axios response');
    return response;
  },
  function (error) {
    // 在 catch 之前做些什么
    return Promise.reject(error);
  },
);

// axios request -> https://api.com/parent/child/ -> axios response
child('/');

// 请求拦截器
parent.interceptors.request.use(
  function (config) {
    console.log('parent request');
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 响应拦截器
parent.interceptors.response.use(
  function (response) {
    console.log('parent response');
    return response;
  },
  function (error) {
    // 在 catch 之前做些什么
    return Promise.reject(error);
  },
);

// axios request -> parent request -> https://api.com/parent/child/ -> parent response -> axios response
child('/');

// 请求拦截器
child.interceptors.request.use(
  function (config) {
    console.log('child request');
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 响应拦截器
child.interceptors.response.use(
  function (response) {
    console.log('child response');
    return response;
  },
  function (error) {
    // 在 catch 之前做些什么
    return Promise.reject(error);
  },
);

// axios request -> parent request -> child request -> https://api.com/parent/child/ -> child response -> parent response -> axios response
child('/');
```

## 使用

使用方式和 `axios` 完全一致。

```ts
const instance = axios.extend({
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
