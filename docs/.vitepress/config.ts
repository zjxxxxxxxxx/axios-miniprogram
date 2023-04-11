import { defineConfig } from 'vitepress';
import { VitePWA } from 'vite-plugin-pwa';
import { themeConfig } from './themeConfig';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'axios-miniprogram',
  description: '基于 Promise 的 HTTP 请求库，适用于各大小程序平台。',
  srcDir: 'pages',
  themeConfig,
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
