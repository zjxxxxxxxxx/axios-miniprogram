# fork

## `axios.fork(defaults)`

现在很多公司后端采用的是微服务架构，您可以为每个服务单独派生一个领域进行请求管理。

派生领域，如果传入 `defaults.baseURL` 为相对路径，则会对 `axios.defaults.baseURL` 和 `defaults.baseURL` 进行拼接。

`domain` 除了拥有和 `axios` 相同的调用方式和请求方法的别名之外，同时还可以复用 `axios` 上的拦截器，这一点是 `axios.create(defaults)` 做不到了。

```typescript
axios.defaults.baseURL = 'https://www.api.com';

const domain = axios.fork({
  baseURL: 'user',
});

domain.get('/:id', { id: 1 }); // get 'https://www.api.com/user/1?id=1'
domain.post('/', { id: 1 }); // post 'https://www.api.com/user/1'
domain.put('/:id', { id: 1 }); // put 'https://www.api.com/user/1?id=1'
domain.delete('/:id', { id: 1 }); // delete 'https://www.api.com/user/1?id=1'
```
