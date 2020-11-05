import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入element插件
import './plugins/element.js'
// 导入全局样式
import './assets/css/global.css'
// 导入样式图标
import './assets/fonts/iconfont.css'
// 导入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://121.36.142.5:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
