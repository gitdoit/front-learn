import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Topic from './views/Topic.vue'
import CreatePost from './views/CreatePost.vue'
import store from './store'

const routes :RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      redriectAlreadyLogin: true
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/topic/:id',
    name: 'topic',
    component: Topic,
    meta: {
      requiredLogin: true
    }
  },
  {
    path: '/createPost',
    name: 'CreatePost',
    component: CreatePost,
    meta: {
      requiredLogin: true
    }
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to)

  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next({ name: 'login' })
  } else if (to.meta.redriectAlreadyLogin && store.state.user.isLogin) {
    next('/')
  } else {
    next()
  }
})

export default router
