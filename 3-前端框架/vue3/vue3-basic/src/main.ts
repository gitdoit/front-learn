import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/reset.css'
import router from './route/index'

createApp(App)
  .use(router)
  .mount('#app')