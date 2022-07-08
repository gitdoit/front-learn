/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createRouter, createWebHashHistory ,RouteRecordRaw} from 'vue-router';
import Basic from '../components/1-basic/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path:'/',
    name:'Home',
    component: () => import(/* webpackChunkName: "home" */ '../components/home.vue'),
    meta:{
      skip: true,
      cnName:'首页'
    }
  },
  {
    path: '/basic',
    name: 'Basic',
    component: Basic,
    meta: {
      cnName: 'ref/computed基础'
    }
  },
  {
    path: '/reactive',
    name: 'Reactive',
    component:  () => import(/* webpackChunkName: "Reactive" */ '../components/2-reactive-api/index.vue'),
    meta: {
      cnName: 'reactive基础'
    }
  },
  {
    path: '/proxy',
    name: 'Proxy',
    component:  () => import(/* webpackChunkName: "Proxy" */ '../components/3-proxy/index.vue'),
    meta: {
      cnName: 'proxy代理优点'
    }
  },
  {
    path: '/life',
    name: 'Life',
    component:  () => import(/* webpackChunkName: "Life" */ '../components/4-lief-circle/index.vue'),
    meta: {
      cnName: '生命周期方法'
    }
  },
  {
    path: '/watch',
    name: 'Watch',
    component:  () => import(/* webpackChunkName: "Watch" */ '../components/5-watch/index.vue'),
    meta: {
      cnName: 'Watch用法'
    }
  },
  {
    path: '/position',
    name: 'Position',
    component:  () => import(/* webpackChunkName: "Position" */ '../components/6-mouse-position/index.vue'),
    meta: {
      cnName: '组合API抽取'
    }
  },
  {
    path: '/generice',
    name: 'Generice',
    component:  () => import(/* webpackChunkName: "generice" */ '../components/7-generice/index.vue'),
    meta: {
      cnName: '泛型提取响应类型'
    }
  },
  {
    path: '/teleport',
    name: 'Teleport',
    component:  () => import(/* webpackChunkName: "teleport" */ '../components/8-teleport/index.vue'),
    meta: {
      cnName: 'Teleport使用'
    }
  },
  {
    path: '/suspense',
    name: 'Suspense',
    component:  () => import(/* webpackChunkName: "suspense" */ '../components/9-suspense/index.vue'),
    meta: {
      cnName: 'Suspense使用'
    }
  },
  {
    path: '/component',
    name: 'Component',
    component:  () => import(/* webpackChunkName: "component" */ '../components/10-dynamic-component/index.vue'),
    meta: {
      cnName: '动态组件'
    }
  },
  {
    path: '/effect',
    name: 'Effect',
    component:  () => import(/* webpackChunkName: "effect" */ '../components/11-effect/index.vue'),
    meta: {
      cnName: 'effect'
    }
  },
  {
    path: '/keep-alive',
    name: 'KeepAlive',
    component:  () => import(/* webpackChunkName: "keep-alive" */ '../components/12-keep-alive/index.vue'),
    meta: {
      cnName: 'KeepAlive'
    }
  },
  {
    path: '/transition',
    name: 'Transition',
    component:  () => import(/* webpackChunkName: "transition" */ '../components/13-transition/index.vue'),
    meta: {
      cnName: 'Transition动画'
    }
  },
  {
    path: '/inject',
    name: 'Inject',
    component:  () => import(/* webpackChunkName: "inject" */ '../components/14-inject/index.vue'),
    meta: {
      cnName: 'inject'
    }
  },
  {
    path: '/mitt',
    name: 'Mitt',
    component:  () => import(/* webpackChunkName: "mitt" */ '../components/15-mitt/index.vue'),
    meta: {
      cnName: '消息总线'
    }
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
