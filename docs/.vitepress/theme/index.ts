import { EnhanceAppContext } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import VPCompatibility from './components/VPCompatibility.vue';

import './styles/vars.css';
import './styles/cover.css';

export default {
  extends: DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    ctx.app.component('VPCompatibility', VPCompatibility);
  },
};
