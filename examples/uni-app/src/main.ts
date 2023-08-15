import { createSSRApp } from 'vue';
export function createApp() {
  const app = createSSRApp({});
  return {
    app,
  };
}
