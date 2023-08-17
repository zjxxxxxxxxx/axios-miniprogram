# [2.7.0](https://github.com/zjxxxxxxxxx/axios-miniprogram/compare/v2.6.0...v2.7.0) (2023-08-17)


### Bug Fixes

* 修复 errno 和 errMsg 丢失 ([71e3007](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/71e30073890974f54461134620dfbda58cc36af0))


### Features

* 新增支持小红书小程序 ([53f0432](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/53f043275ced79c7204d791c62721e36db512f24))



# [2.6.0](https://github.com/zjxxxxxxxxx/axios-miniprogram/compare/v2.5.0...v2.6.0) (2023-08-13)


### Features

* 废弃 fork API ([a04f833](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/a04f833d917cb07c3bd95678260971194179def0))


### BREAKING CHANGES

* axios.fork() 已废弃



# [2.5.0](https://github.com/zjxxxxxxxxx/axios-miniprogram/compare/v2.4.2...v2.5.0) (2023-06-04)


### Features

* 移除内置的 uni 适配器 ([96ea026](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/96ea0266dd7c0da26341d8fea4d3bdb53361ffd0)), closes [#40](https://github.com/zjxxxxxxxxx/axios-miniprogram/issues/40)


### BREAKING CHANGES

* uni 不再内部支持, 可以参阅文档中的自定义适配器自行适配 uni



## [2.4.2](https://github.com/zjxxxxxxxxx/axios-miniprogram/compare/v2.4.1...v2.4.2) (2023-05-14)


### Bug Fixes

* axios.use 函数返回值不是当前实例 ([74856f7](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/74856f7fdef4f0e75b8665300960416a840f561c))


### Features

* 发出请求前进行动态地址插值 ([b6698ca](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/b6698ca22da3f754e21916e69d43b961e12571e6))



## [2.4.1](https://github.com/zjxxxxxxxxx/axios-miniprogram/compare/v2.4.0...v2.4.1) (2023-05-04)


### Bug Fixes

* 配置原始 URL 丢失 ([8b6eed2](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/8b6eed2d6df5c7aacd181f6fbcfba9eca875178c))
* 配置原始请求方法丢失 ([c107171](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/c107171eba69a129eddad34861611837a0efac25))


### Features

* 请求发送前请求方法转小写 ([0b82403](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/0b82403c4c630676042ff390b77d5791c4ab0a6e))
* 允许设置默认请求方法 ([4b02582](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/4b025821525712d7e6bb68faa9af3cf7d9ad0e0d))
* getUri 支持 baseURL/dynamicURL ([633c920](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/633c92024718370e24919fcfb44b86b795248c8f))


### Performance Improvements

* 优化中间件 ([3931f23](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/3931f230deffbb72a70fd24798334e63a3d531f9))



# [2.4.0](https://github.com/zjxxxxxxxxx/axios-miniprogram/compare/v2.3.2...v2.4.0) (2023-04-25)


### Bug Fixes

* 丢失末尾自带的斜线 ([db787a2](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/db787a2b5f7f1188d1813ddb715ef23e653120a9)), closes [#44](https://github.com/zjxxxxxxxxx/axios-miniprogram/issues/44)


### Features

* 全局方法 create 改为实例方法 ([a84533a](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/a84533a09f493e27ba3e567549be5e534271ed22))
* 添加扩展实例 ([9093e1b](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/9093e1bdffe5bd75fccfeeeeb0e2b487751c549a))
* 添加中间件 ([6263759](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/6263759ba94b2269082c49a2f2a5e038f6766027))
* 支持复用父级中间件 ([bfc012b](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/bfc012b4999d717629b997ab908fd411954b0323))


### Reverts

* 取消支持为路径添加中间件 ([1e5809a](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/1e5809aee3f1653eced0c2ca351c6e3f8616f719))


### BREAKING CHANGES

* 原派生领域替换为功能更强的扩展实例



## [2.3.2](https://github.com/zjxxxxxxxxx/axios-miniprogram/compare/v2.3.1...v2.3.2) (2023-04-23)


### Bug Fixes

* 适配器请求头丢失 ([c0ca900](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/c0ca9001d2dc2b138a916c18da000b733d58ec7a)), closes [#43](https://github.com/zjxxxxxxxxx/axios-miniprogram/issues/43)



## [2.3.1](https://github.com/zjxxxxxxxxx/axios-miniprogram/compare/v2.3.0...v2.3.1) (2023-04-21)


### Bug Fixes

* 控制台没有输出适配器错误 ([258954a](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/258954afc1c39483ff6b1828c8904c5b284890d2))
* 下载进度/上传进度 类型错误 ([2d691b6](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/2d691b69cbb2d3e27be3698bf4a4188cf71ccb7e))


### Features

* 添加版本号 ([e3346a8](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/e3346a866f12ed8aa07695f45a8177d631973abd))



# [2.3.0](https://github.com/zjxxxxxxxxx/axios-miniprogram/compare/v2.2.0...v2.3.0) (2023-04-18)


### Bug Fixes

* 错误处理不是每次出错都执行 ([fb4762d](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/fb4762d01a0d304ce6c291d6487dce1507a985c5))
* data 不支持对象以外的类型 ([4d8ec80](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/4d8ec80f29b85e3419d1bc5112886a397ee2cc48))


### Features

* 从参数中删除动态地址属性 ([b0eaa04](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/b0eaa04c66dc82de944769893f62ecd0c4ae76d8))
* 提供更多可使用的类型 ([0dc58a4](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/0dc58a4b0cdd5d36c1b16f13697d8180952cb093))
* 支持具名导入工具函数 ([d714ed2](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/d714ed23c0f3b8ea3abecfb042c67bcf9adb29a7))
* 支持清空拦截器 ([cbcc43a](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/cbcc43ad77f0e79223e524aa6bb4502ee4b989c9))



# [2.2.0](https://github.com/zjxxxxxxxxx/axios-miniprogram/compare/v2.1.0...v2.2.0) (2023-04-16)


### Bug Fixes

* 修复 Proxy uni 错误 ([021e052](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/021e05233a95ebc5c5f93d114d225cc45a22675f))


### Features

* 仅 post/put/patch 方法允许设置请求数据 ([2c3ff56](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/2c3ff567c19197f6377645cd9f7109806cd93b77))
* 支持 HTTP PATCH 请求 ([22bcefc](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/22bcefcb97e50400403b131d307c97eb4cbb6071))



# [2.1.0](https://github.com/zjxxxxxxxxx/axios-miniprogram/compare/v2.0.0...v2.1.0) (2023-04-11)


### Bug Fixes

* 修复 axios.fork() 无法访问私有方法 ([2254e73](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/2254e73cf76f1bc95d4850211e3fa34acae50136))
* 移除 url 末尾的斜线 ([1c09ffd](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/1c09ffdd91d554078423cba57fe036106e9b0fa8))


### Features

* 适配器异常处理成响应异常 ([be17ba7](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/be17ba7e6881699aeb74b45c8b4b084e1e53a777))
* 添加新功能 派生领域 axios.fork() ([222b935](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/222b935f6839ce8fcecfa951d937e6160211f7f9))
* 修改 mergeConfig 中 data 的合并方式 ([ee6a31b](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/ee6a31b4bbc07e93f8754c83a1ff02495a23dfa7))
* 支持深度合并 params & data ([22f65cf](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/22f65cf69c877f314b269d8c3d0fac8f1c8ab71f))
* fileName 替换为 name ([69044f3](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/69044f35833d8d42a5f0c12b01687298c08f589b))



# [2.0.0](https://github.com/zjxxxxxxxxx/axios-miniprogram/compare/v2.0.0-beta.10...v2.0.0) (2023-04-05)


### Bug Fixes

* 修复 dynamicURL 错误匹配端口号 ([7e29e91](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/7e29e91f0a2a4b1b1f3ca49a9cd5ff123466301a))


### Features

* 添加新的 API isAxiosError ([61337a9](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/61337a9bbe100cdab9e175f8ee42e4d5d2ba6842))
* 优化 defaults ([2793dd8](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/2793dd8b5e1ad34218088718314e06545033cbbf))


### BREAKING CHANGES

* 移除了 headers 中 post,put 默认值



# [2.0.0-beta.10](https://github.com/zjxxxxxxxxx/axios-miniprogram/compare/v2.0.0-beta.0...v2.0.0-beta.10) (2023-04-05)


### Features

* 支持 es2015 ([b66176f](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/b66176f0ed90eaec5c1377077359a234691ae1b3))



# 2.0.0-beta.0 (2023-04-04)

### Bug Fixes

* 清理 url 前面多余的斜线 ([666a942](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/666a9427d3c9bfbd96def9e112d5183acdf08d84))

### Features

* 增强默认参数系列化器 ([0cfb3e1](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/0cfb3e1ff04b69896ba43ffcb6abba5fb61ad48a))
* 支持合并自定义配置 ([4409a57](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/4409a5720ba1e58a4c218ee67f71d5f05beee6a8)), closes [#38](https://github.com/zjxxxxxxxxx/axios-miniprogram/issues/38)
* 支持京东小程序 ([0d1d21f](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/0d1d21fc66eb202463ef2baaa174b0f60276035e))
* 支持自定义配置 ([b15b31e](https://github.com/zjxxxxxxxxx/axios-miniprogram/commit/b15b31ee55217f11e08713ce02dd7ab21732fba1))

### BREAKING CHANGES

* axios.get('url',{obj:{v1:1,v2:2}}) -> fetch: 'url?obj={"val":1,"v2":2}'
  变为
  axios.get('url',{obj:{v1:1,v2:2}}) -> fetch: 'url?obj[v1]=1&obj[v2]=2'
