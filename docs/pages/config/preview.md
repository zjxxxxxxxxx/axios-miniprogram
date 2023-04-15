# 默认配置

## 全局默认配置`axios.defaults`

```ts
axios.defaults.baseURL = 'https://www.api.com';
axios.defaults.headers.common['Accept'] = 'application/json, test/plain, */*';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded; charset=utf-8';
```

## 自定义实例默认配置

可以创建时传递。

```ts
const instance = axios.create({
  baseURL: 'https://www.api.com',
  headers: {
    common: {
      Accept: 'application/json, test/plain, */*',
    },
    post: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
  },
});
```

也可以创建后修改。

```ts
instance.defaults.baseURL = 'https://www.api.com';
instance.defaults.headers.common['Accept'] =
  'application/json, test/plain, */*';
instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded; charset=utf-8';
```

## 配置优先顺序

发送请求时，会使用默认配置`defaults`和自定义配置`config`合并出请求配置`requestConfig`，然后用合并出的请求配置`requestConfig`去发送请求，多数情况下，后者优先级要高于前者，具体合并策略可以参考 [mergeConfig.ts](https://github.com/early-autumn/axios-miniprogram/blob/master/src/core/mergeConfig.ts) 的实现。

## 配置表

非全平台兼容的属性只会在平台支持的情况下生效。

| 参数              |           类型            | 默认值                                                                                | 说明               | 全平台兼容 |
| :---------------- | :-----------------------: | :------------------------------------------------------------------------------------ | :----------------- | :--------- |
| adapter           |         Function          | [查看](https://github.com/early-autumn/axios-miniprogram/blob/master/src/defaults.ts) | 自定义适配器       | 是         |
| baseURL           |          String           |                                                                                       | 基础地址           | 是         |
| url               |          String           |                                                                                       | 请求地址           | 是         |
| method            |          String           | get                                                                                   | 请求方法           |            |
| params            |          Object           |                                                                                       | 请求参数           | 是         |
| data              | String/Object/ArrayBuffer |                                                                                       | 请求数据           | 是         |
| headers           |          Object           | [查看](https://github.com/early-autumn/axios-miniprogram/blob/master/src/defaults.ts) | 请求头             | 是         |
| validateStatus    |         Function          | [查看](https://github.com/early-autumn/axios-miniprogram/blob/master/src/defaults.ts) | 自定义合法状态码   | 是         |
| paramsSerializer  |         Function          |                                                                                       | 自定义参数序列化   | 是         |
| transformRequest  | Function/Array\<Function> |                                                                                       | 自定义转换请求数据 | 是         |
| transformResponse | Function/Array\<Function> |                                                                                       | 自定义转换响应数据 | 是         |
| errorHandler      |         Function          |                                                                                       | 自定义错误处理     | 是         |
| cancelToken       |          Object           |                                                                                       | 取消令牌           | 是         |
| timeout           |          Number           | 10000                                                                                 | 超时时间           |            |
| dataType          |          String           | json                                                                                  | 响应数据格式       | 是         |
| responseType      |          String           | text                                                                                  | 响应数据类型       | 是         |
| enableHttp2       |          Boolean          | false                                                                                 | 开启 http2         |            |
| enableQuic        |          Boolean          | false                                                                                 | 开启 quic          |            |
| enableCache       |          Boolean          | false                                                                                 | 开启 cache         |            |
| sslVerify         |          Boolean          | true                                                                                  | 验证 ssl 证书      |            |
