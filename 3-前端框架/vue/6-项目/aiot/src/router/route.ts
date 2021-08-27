import {createRouter,createWebHashHistory,RouteRecordRaw} from 'vue-router';
import tenant from '../pages/tenant.vue';
import user from '../pages/user.vue';
import sensor from '../pages/sensor.vue';
import monitor from '../pages/monitor.vue';


const routes  :RouteRecordRaw[]= [
    {
        path: '/',
        component: tenant,
    },
    {
        path: '/tenant',
        component: tenant
    },
    {
        path: '/user',
        component: user,
    },
    {
        path: '/sensor',
        component: sensor,
    },
    {
        path: '/monitor',
        component: monitor,
    }
]

const router = createRouter(
    {
        history: createWebHashHistory(),
        routes
    }
)
export default router