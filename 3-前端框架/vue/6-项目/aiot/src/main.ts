import { createApp } from 'vue'
import App from './App.vue'
import route from './route'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/reset.css'

createApp(App)
  .use(ElementPlus)
  .use(route)
  .mount('#app')
