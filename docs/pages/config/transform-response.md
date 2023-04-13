# transformResponse

## `config.transformResponse`自定义转换响应数据

可以在请求发出之前转换请求数据。

```ts
axios('/user', {
  transformResponse: [
    function transformResponse(data, headers) {
      // 转换请求数据
      return data;
    },
  ],
});
```
