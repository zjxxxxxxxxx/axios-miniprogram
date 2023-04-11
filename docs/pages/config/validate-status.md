# validateStatus

## 自定义合法状态码`config.validateStatus`

可以让请求按照您的要求成功或者失败。

```typescript
axios('/user', {
  validateStatus: function validateStatus(status) {
    // 这样，状态码在 200 到 400 之间都是请求成功
    return status >= 200 && status < 400;
  },
});
```
