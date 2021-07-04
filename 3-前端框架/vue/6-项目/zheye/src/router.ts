import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Topic from './views/Topic.vue'

const routes :RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/topic/:id',
    name: 'tipic',
    component: Topic
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
