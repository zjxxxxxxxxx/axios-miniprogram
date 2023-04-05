# [2.0.0](https://github.com/zjx0905/axios-miniprogram/compare/v2.0.0-beta.10...v2.0.0) (2023-04-05)


### Bug Fixes

* 修复 dynamicURL 错误匹配端口号 ([7e29e91](https://github.com/zjx0905/axios-miniprogram/commit/7e29e91f0a2a4b1b1f3ca49a9cd5ff123466301a))


### Features

* 添加新的 API isAxiosError ([61337a9](https://github.com/zjx0905/axios-miniprogram/commit/61337a9bbe100cdab9e175f8ee42e4d5d2ba6842))
* 优化 defaults ([2793dd8](https://github.com/zjx0905/axios-miniprogram/commit/2793dd8b5e1ad34218088718314e06545033cbbf))


### BREAKING CHANGES

* 移除了 headers 中 post,put 默认值



# [2.0.0-beta.10](https://github.com/zjx0905/axios-miniprogram/compare/v2.0.0-beta.0...v2.0.0-beta.10) (2023-04-05)


### Features

* 支持 es2015 ([b66176f](https://github.com/zjx0905/axios-miniprogram/commit/b66176f0ed90eaec5c1377077359a234691ae1b3))



# 2.0.0-beta.0 (2023-04-04)

### Bug Fixes

* 清理 url 前面多余的斜线 ([666a942](https://github.com/zjx0905/axios-miniprogram/commit/666a9427d3c9bfbd96def9e112d5183acdf08d84))

### Features

* 增强默认参数系列化器 ([0cfb3e1](https://github.com/zjx0905/axios-miniprogram/commit/0cfb3e1ff04b69896ba43ffcb6abba5fb61ad48a))
* 支持合并自定义配置 ([4409a57](https://github.com/zjx0905/axios-miniprogram/commit/4409a5720ba1e58a4c218ee67f71d5f05beee6a8)), closes [#38](https://github.com/zjx0905/axios-miniprogram/issues/38)
* 支持京东小程序 ([0d1d21f](https://github.com/zjx0905/axios-miniprogram/commit/0d1d21fc66eb202463ef2baaa174b0f60276035e))
* 支持自定义配置 ([b15b31e](https://github.com/zjx0905/axios-miniprogram/commit/b15b31ee55217f11e08713ce02dd7ab21732fba1))

### BREAKING CHANGES

* axios.get('url',{obj:{v1:1,v2:2}}) -> fetch: 'url?obj={"val":1,"v2":2}'
  变为
  axios.get('url',{obj:{v1:1,v2:2}}) -> fetch: 'url?obj[v1]=1&obj[v2]=2'
