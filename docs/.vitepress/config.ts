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
  lastUpdated: true,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    nav: [
      { text: '指南', link: '/intro' },
      { text: '基础', link: '/basics/request' },
    ],

    sidebar: sidebar(),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zjx0905/axios-miniprogram' },
    ],

    editLink: {
      pattern: ({ relativePath }) => {
        if (relativePath === 'intro.md') {
          return 'https://github.com/zjx0905/axios-miniprogram/edit/main/README.md';
        }
        return 'https://github.com/zjx0905/axios-miniprogram/edit/main/docs/pages/:path';
      },
      text: '在 GitHub 上编辑此页面',
    },

    algolia: algolia(),

    returnToTopLabel: '返回顶部',
    outlineTitle: '导航栏',
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '菜单',
    lastUpdatedText: '最后一次更新',
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

function sidebar() {
  return [
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
        { text: '发送请求', link: '/basics/request' },
        { text: 'OPTIONS 请求', link: '/basics/options' },
        { text: 'GET 请求', link: '/basics/get' },
        { text: 'HEAD 请求', link: '/basics/head' },
        { text: 'POST 请求', link: '/basics/post' },
        { text: 'PUT 请求', link: '/basics/put' },
        { text: 'PATCH 请求', link: '/basics/patch' },
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
  ];
}

function algolia() {
  return {
    appId: 'B2V3TSSQ2T',
    apiKey: 'c3edeb2daf09a254ec07ad98abfd84b5',
    indexName: 'axios-miniprogram',
    placeholder: '搜索文档',
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档',
      },
      modal: {
        searchBox: {
          resetButtonTitle: '清除查询条件',
          resetButtonAriaLabel: '清除查询条件',
          cancelButtonText: '取消',
          cancelButtonAriaLabel: '取消',
        },
        startScreen: {
          recentSearchesTitle: '搜索历史',
          noRecentSearchesText: '没有搜索历史',
          saveRecentSearchButtonTitle: '保存至搜索历史',
          removeRecentSearchButtonTitle: '从搜索历史中移除',
          favoriteSearchesTitle: '收藏',
          removeFavoriteSearchButtonTitle: '从收藏中移除',
        },
        errorScreen: {
          titleText: '无法获取结果',
          helpText: '你可能需要检查你的网络连接',
        },
        footer: {
          selectText: '选择',
          navigateText: '切换',
          closeText: '关闭',
          searchByText: '搜索提供者',
        },
        noResultsScreen: {
          noResultsText: '无法找到相关结果',
          suggestedQueryText: '你可以尝试查询',
          reportMissingResultsText: '你认为该查询应该有结果？',
          reportMissingResultsLinkText: '点击反馈',
        },
      },
    },
  };
}
