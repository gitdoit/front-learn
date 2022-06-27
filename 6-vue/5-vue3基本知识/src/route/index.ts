/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createRouter, createWebHashHistory } from 'vue-router';
import Basic from '../components/1-basic/index.vue';

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
  {
    path: '/reactive',
    name: 'Reactive',
    component:  () => import(/* webpackChunkName: "Reactive" */ '../components/2-reactive-api/index.vue'),
    cnName: 'reactive基础'
  },
  {
    path: '/proxy',
    name: 'Proxy',
    component:  () => import(/* webpackChunkName: "Proxy" */ '../components/3-proxy/index.vue'),
    cnName: 'proxy代理优点'
  },
  {
    path: '/life',
    name: 'Life',
    component:  () => import(/* webpackChunkName: "Life" */ '../components/4-lief-circle/index.vue'),
    cnName: '生命周期方法'
  },
  {
    path: '/watch',
    name: 'Watch',
    component:  () => import(/* webpackChunkName: "Watch" */ '../components/5-watch/index.vue'),
    cnName: 'Watch用法'
  },
  {
    path: '/position',
    name: 'Position',
    component:  () => import(/* webpackChunkName: "Position" */ '../components/6-mouse-position/index.vue'),
    cnName: '组合API抽取'
  },
  {
    path: '/generice',
    name: 'Generice',
    component:  () => import(/* webpackChunkName: "generice" */ '../components/7-generice/index.vue'),
    cnName: '泛型提取响应类型'
  },
  {
    path: '/teleport',
    name: 'Teleport',
    component:  () => import(/* webpackChunkName: "teleport" */ '../components/8-teleport/index.vue'),
    cnName: 'Teleport使用'
  },
  {
    path: '/suspense',
    name: 'Suspense',
    component:  () => import(/* webpackChunkName: "suspense" */ '../components/9-suspense/index.vue'),
    cnName: 'Suspense使用'
  },
  {
    path: '/component',
    name: 'Component',
    component:  () => import(/* webpackChunkName: "suspense" */ '../components/10-dynamic-component/index.vue'),
    cnName: '动态组件'
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
export {
  routes
}
