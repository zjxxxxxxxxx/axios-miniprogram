import { defineConfig } from 'vitepress';
import { VitePWA } from 'vite-plugin-pwa';
import { linkIntro } from './utils/link-intro';

linkIntro();

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'axios-miniprogram',
  titleTemplate: ':title - axios',
  description: '基于 Promise 的 HTTP 请求库，适用于各大小程序平台。',
  srcDir: 'pages',
  lastUpdated: true,
  cleanUrls: true,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    nav: [
      { text: '指南', link: '/guide/intro', activeMatch: '/guide/' },
      { text: '入门', link: '/basics/request', activeMatch: '/basics/' },
      {
        text: '进阶',
        link: '/advanced/middleware',
        activeMatch: '/advanced/',
      },
    ],

    sidebar: sidebar(),

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/zjxxxxxxxxx/axios-miniprogram',
      },
    ],

    editLink: {
      pattern: ({ relativePath }) => {
        if (relativePath.endsWith('/intro.md')) {
          return 'https://github.com/zjxxxxxxxxx/axios-miniprogram/edit/main/README.md';
        }
        return `https://github.com/zjxxxxxxxxx/axios-miniprogram/edit/main/docs/pages/${relativePath}`;
      },
      text: '在 GitHub 上编辑此页面',
    },

    algolia: algolia(),

    returnToTopLabel: '返回顶部',
    outlineTitle: '导航',
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '菜单',
    lastUpdatedText: '最后一次更新',
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    footer: {
      message:
        '根据 <a href="https://github.com/zjxxxxxxxxx/axios-miniprogram/blob/main/LICENSE">MIT License</a> 发布',
      copyright:
        'Copyright © 2020-至今 <a href="https://github.com/zjxxxxxxxxx">zjxxxxxxxxx</a>',
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
        { text: '简介', link: '/guide/intro' },
        { text: '开始', link: '/guide/quick-start' },
      ],
    },

    {
      text: '入门',
      items: [
        { text: '发送请求', link: '/basics/request' },
        { text: '响应体', link: '/basics/response' },
        { text: '错误处理', link: '/basics/error-handler' },
        { text: '动态地址', link: '/basics/dynamic-url' },
        { text: '请求配置', link: '/basics/config' },
        { text: '默认配置', link: '/basics/defaults' },
        { text: '参数系列化', link: '/basics/params-serializer' },
        { text: '转换数据', link: '/basics/transform-data' },
        { text: '下载文件', link: '/basics/download' },
        { text: '上传文件', link: '/basics/upload' },
      ],
      collapsed: false,
    },

    {
      text: '进阶',
      items: [
        { text: '中间件', link: '/advanced/middleware' },
        { text: '请求拦截器', link: '/advanced/request-interceptor' },
        { text: '响应拦截器', link: '/advanced/response-interceptor' },
        { text: '取消请求', link: '/advanced/cancel' },
        { text: '创建实例', link: '/advanced/instance' },
        { text: '扩展实例', link: '/advanced/extend' },
        { text: '平台适配器', link: '/advanced/adapter' },
      ],
      collapsed: false,
    },

    {
      text: '请求方法',
      items: [
        { text: 'OPTIONS', link: '/method/OPTIONS' },
        { text: 'GET', link: '/method/GET' },
        { text: 'HEAD', link: '/method/HEAD' },
        { text: 'POST', link: '/method/POST' },
        { text: 'PUT', link: '/method/PUT' },
        { text: 'PATCH', link: '/method/PATCH' },
        { text: 'DELETE', link: '/method/DELETE' },
        { text: 'TRACE', link: '/method/TRACE' },
        { text: 'CONNECT', link: '/method/CONNECT' },
      ],
      collapsed: false,
    },

    {
      text: '致贡献者',
      items: [
        {
          text: '行为准则',
          link: 'https://github.com/zjxxxxxxxxx/axios-miniprogram/blob/main/CODE_OF_CONDUCT.md',
        },
        {
          text: '贡献指南',
          link: 'https://github.com/zjxxxxxxxxx/axios-miniprogram/blob/main/CONTRIBUTING.md',
        },
      ],
    },
  ];
}

function algolia() {
  return {
    appId: 'B2V3TSSQ2T',
    apiKey: '2eddc4539ada25bf664eddcb91930736',
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
