import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import store from './store';

// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  // 激活某个路由的时候会给这个link加上这个class
  linkExactActiveClass: 'active',
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
      component: () => import(/* webpackChunkName: "calcu" */ './views/计算器.vue'),
    },
    {
      path: '/todo',
      name: 'TodoList',
      component: () => import(/* webpackChunkName: "todo" */ './views/TodoList.vue'),
    },
    {
      path: '/todo-with-child',
      name: 'TodoListWithChild',
      component: () => import(/* webpackChunkName: "todo-with-child" */ './views/TodoListWithChild.vue'),
      children: [
        {
          path: '/add',
          name: 'Add',
          component: () => import(/* webpackChunkName: "todo-with-child" */ './components/Add.vue'),
        },
        {
          path: '/done',
          name: 'Done',
          component: () => import(/* webpackChunkName: "todo-with-child" */ './components/Done.vue'),
        },
        {
          path: '/delete',
          name: 'Delete',
          component: () => import(/* webpackChunkName: "todo-with-child" */ './components/Delete.vue'),
        },
      ],
    },
  ],
});
createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
