# interceptors

## `axios.interceptors`拦截器

可以先拦截请求或响应，然后再由 then 或 catch 处理。

```typescript
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    //处理请求错误
    return Promise.reject(error);
  },
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 请求成功后做些什么
    return response;
  },
  function (error) {
    // 处理响应错误
    return Promise.reject(error);
  },
);
```

如果以后需要删除拦截器，则可以。

```typescript
const myInterceptor = axios.interceptors.request.use(function () {
  // 在发送请求之前做些什么
});
axios.interceptors.request.eject(myInterceptor);
```

还可以将拦截器添加到`axios`的`自定义实例`中。

```typescript
const myInterceptor = instance.interceptors.request.use(function () {
  // 在发送请求之前做些什么
});
instance.interceptors.request.eject(myInterceptor);
```
