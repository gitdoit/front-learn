import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import store from './store';

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
    },
    {
      path: '/father-son',
      name: 'FatherSon',
      component: () => import(/* webpackChunkName: "about" */ './views/父子传值.vue'),
    },
    {
      path: '/calcu',
      name: 'Calcu',
      component: () => import(/* webpackChunkName: "about" */ './views/计算器.vue'),
    },
  ],
});
createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
