# CancelToken

## `axios.CancelToken`取消令牌

可以使用`CancelToken`取消已经发出的请求。

```typescript
let cancel;

axios('/api', {
  cancelToken: new axios.CancelToken(function (c) {
    cancel = c;
  }),
});

cancel('取消请求');
```

还可以使用`CancelToken.source`工厂方法创建`CancelToken`。

```typescript
const source = axios.CancelToken.source();

axios('/api', {
  cancelToken: source.token,
});

source.cancel('取消请求');
```
