import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import stroe from './store'

import 'tailwindcss/tailwind.css'

createApp(App).use(router).use(stroe).mount('#app')
