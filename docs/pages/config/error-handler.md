# errorHandler

## 自定义错误处理`config.errorHandler`

可以添加到默认配置中，统一处理错误。

```typescript
axios.defaults.errorHandler = function errorHandler(error) {
  // 做一些想做的事情
  return Promise.reject(error);
};

const instance = axios.create({
  errorHandler: function errorHandler(error) {
    // 做一些想做的事情
    return Promise.reject(error);
  },
});
```

也可以发送请求时通过自定义配置传入。

```typescript
axios('/user', {
  errorHandler: function errorHandler(error) {
    // 做一些想做的事情
    return Promise.reject(error);
  },
});
```
