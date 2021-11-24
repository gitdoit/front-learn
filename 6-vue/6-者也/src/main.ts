import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import 'tailwindcss/tailwind.css'
axios.interceptors.request.use(config => {
  store.commit('changeLoading', true)
  return config
})
axios.interceptors.response.use(config => {
  store.commit('changeLoading', false)
  return config
})

createApp(App).use(router).use(store).mount('#app')
