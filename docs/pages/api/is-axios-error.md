# isAxiosError

## `axios.isAxiosError` 是否是 AxiosError

可以判断当前错误是否来自请求响应，而不是语法错误或者用户主动抛出的错误

```ts
axios('/user').catch((error) => {
  if (axios.isAxiosError(error)) {
    // 错误是否来自原生接口的 fail 回调
    // 如果错误来自对状态码的判断，这种情况是没有这个属性的
    error.isFail;
    // 请求配置
    error.config;
    // 请求任务
    error.request;
    // 响应体
    error.response;
  }
});
```
