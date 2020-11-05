/* eslint-disable no-constant-condition */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'

Vue.use(VueRouter)

const routes = [
  // 这个语法规则很严格，{} 里前后必须有一个空格
  { path: '/login', component: Login },
  { path: '/', redirect: '/login' },
  { path: '/home', component: Home, redirect: '/welcom', children: [{ path: '/welcom', component: Welcome }] }
]

const router = new VueRouter({
  routes
})
/* router.beforeEach((to, from, next) => {
  if (to.path === '/login') { return next() }
  const tokenStr = window.sessionStorage.getItem('token')
  console.info(tokenStr)
  if (!tokenStr) { return next('/login') }
  next()
}) */
export default router
