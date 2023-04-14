import { defineConfig } from 'vitepress';
import { VitePWA } from 'vite-plugin-pwa';
import { createIntroMD } from './utils/createIntroMD';

createIntroMD();

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'axios-miniprogram',
  titleTemplate: ':title - axios',
  description: '基于 Promise 的 HTTP 请求库，适用于各大小程序平台。',
  srcDir: 'pages',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/intro' },
      { text: '基础', link: '/basics/options' },
    ],

    sidebar: [
      {
        text: '指南',
        items: [
          { text: '简介', link: '/intro' },
          { text: '开始', link: '/start' },
        ],
      },
      {
        text: '基础',
        items: [
          { text: 'OPTIONS 请求', link: '/basics/options' },
          { text: 'GET 请求', link: '/basics/get' },
          { text: 'HEAD 请求', link: '/basics/head' },
          { text: 'POST 请求', link: '/basics/post' },
          { text: 'PUT 请求', link: '/basics/put' },
          { text: 'DELETE 请求', link: '/basics/delete' },
          { text: 'TRACE 请求', link: '/basics/trace' },
          { text: 'CONNECT 请求', link: '/basics/connect' },
        ],
      },

      {
        text: '配置',
        items: [
          {
            text: '默认配置',
            link: '/config/preview',
          },
          {
            text: 'method',
            link: '/config/method',
          },
          {
            text: 'dataType',
            link: '/config/data-type',
          },
          {
            text: 'responseType',
            link: '/config/response-type',
          },
          {
            text: 'validateStatus',
            link: '/config/validate-status',
          },
          {
            text: 'paramsSerializer',
            link: '/config/params-serializer',
          },
          {
            text: 'transformRequest',
            link: '/config/transform-request',
          },
          {
            text: 'transformResponse',
            link: '/config/transform-response',
          },
          {
            text: 'errorHandler',
            link: '/config/error-handler',
          },
          {
            text: 'upload',
            link: '/config/upload',
          },
          {
            text: 'download',
            link: '/config/download',
          },
          {
            text: 'adapter',
            link: '/config/adapter',
          },
        ],
      },
      {
        text: 'API',
        items: [
          {
            text: 'interceptors',
            link: '/api/interceptors',
          },
          {
            text: 'CancelToken',
            link: '/api/cancel-token',
          },
          {
            text: 'isCancel',
            link: '/api/is-cancel',
          },
          {
            text: 'isAxiosError',
            link: '/api/is-axios-error',
          },
          {
            text: 'getUri',
            link: '/api/get-uri',
          },
          {
            text: 'create',
            link: '/api/create',
          },
          {
            text: 'fork <Badge type="warning" text="2.1.0" />',
            link: '/api/fork',
          },
          {
            text: 'Axios',
            link: '/api/axios',
          },
        ],
      },
      {
        text: '致贡献者',
        items: [
          {
            text: '行为准则',
            link: 'https://github.com/zjx0905/axios-miniprogram/blob/main/CODE_OF_CONDUCT.md',
          },
          {
            text: '贡献指南',
            link: 'https://github.com/zjx0905/axios-miniprogram/blob/main/CONTRIBUTING.md',
          },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zjx0905/axios-miniprogram' },
    ],

    returnToTopLabel: '返回顶部',
    outlineTitle: '导航栏',
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '菜单',
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    footer: {
      message:
        '根据 <a href="https://github.com/zjx0905/axios-miniprogram/blob/main/LICENSE">MIT License</a> 发布',
      copyright:
        'Copyright © 2020-至今 <a href="https://github.com/zjx0905">zjx0905</a>',
    },
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },

  vite: {
    plugins: [
      VitePWA({
        outDir: '.vitepress/dist',
        manifest: {
          name: 'axios-miniprogram',
          short_name: 'axios',
          theme_color: '#ffffff',
          icons: [],
        },
      }),
    ],
  },
});
