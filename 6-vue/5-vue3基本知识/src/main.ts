import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/reset.css'
import router from './route/index'
import Hljs from 'highlight.js';
import 'highlight.js/styles/androidstudio.css';
import Code from './components/code.vue'

createApp(App)
  .use(router)
  .component('m-code',Code)
  .directive('code',(el) => {
    const blocks = el.querySelectorAll('pre code');
    for (let i = 0; i < blocks.length; i++) {
        Hljs.highlightElement(blocks[i]);
    }
  })
  .mount('#app')