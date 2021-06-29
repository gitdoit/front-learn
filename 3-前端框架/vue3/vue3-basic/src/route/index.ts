import { createRouter, createWebHashHistory } from 'vue-router';
import Basic from '../components/1-basic.vue';

const routes = [
  {
    path:'/',
    name:'Home',
    component: () => import(/* webpackChunkName: "home" */ '../components/home.vue')
  },
  {
    path: '/basic',
    name: 'Basic',
    component: Basic,
    cnName: 'ref/computed基础'
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
export {
  routes
}
