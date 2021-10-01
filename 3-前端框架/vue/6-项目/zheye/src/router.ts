import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Topic from './views/Topic.vue'
import CreatePost from './views/CreatePost.vue'

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
    name: 'topic',
    component: Topic
  },
  {
    path: '/createPost',
    name: 'CreatePost',
    component: CreatePost
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
