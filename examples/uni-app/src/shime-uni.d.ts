export {};

declare module 'vue' {
  type Hooks = App.AppInstance & Page.PageInstance;
  type ComponentCustomOptions = Hooks;
}
