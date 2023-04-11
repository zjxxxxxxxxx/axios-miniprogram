import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'axios-miniprogram',
  description: '基于 Promise 的 HTTP 请求库，适用于各大小程序平台。',
  srcDir: 'pages',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/guide/introduction' },
      { text: '配置', link: '/config/preview' },
      { text: 'API', link: '/api/interceptors' },
    ],

    sidebar: [
      {
        text: '指南',
        items: [
          { text: '简介', link: '/guide/introduction' },
          { text: '快速上手', link: '/guide/quick-start' },
        ],
      },
      {
        text: '配置',
        items: [
          { text: '默认配置', link: '/config/preview' },
          { text: 'method', link: '/config/method' },
          { text: 'dataType', link: '/config/data-type' },
          { text: 'responseType', link: '/config/response-type' },
          { text: 'validateStatus', link: '/config/validate-status' },
          { text: 'paramsSerializer', link: '/config/params-serializer' },
          { text: 'transformRequest', link: '/config/transform-request' },
          { text: 'transformResponse', link: '/config/transform-response' },
          { text: 'errorHandler', link: '/config/error-handler' },
          { text: 'upload', link: '/config/upload' },
          { text: 'download', link: '/config/download' },
          { text: 'adapter', link: '/config/adapter' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'interceptors', link: '/api/interceptors' },
          { text: 'CancelToken', link: '/api/cancel-token' },
          { text: 'isCancel', link: '/api/is-cancel' },
          { text: 'isAxiosError', link: '/api/is-axios-error' },
          { text: 'getUri', link: '/api/get-uri' },
          { text: 'create', link: '/api/create' },
          { text: 'Axios', link: '/api/axios' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zjx0905/axios-miniprogram' },
    ],

    returnToTopLabel: '返回顶部',
    outlineTitle: '导航栏',
  },
});
