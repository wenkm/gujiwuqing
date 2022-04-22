/*
* @Author: Kevin
* @Date: 2022-04-22 13:00:56
* @Description: 路由配置
*/
import {createRouter, createWebHashHistory} from 'vue-router';
import Home from '@/views/home.vue';
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/about',
            name: 'About',
            component: () => import('@/views/about.vue')
        },
        {
            path: '/link',
            name: 'Link',
            component: () => import('@/views/link.vue')
        },
        {
            path: '/archive',
            name: 'Archive',
            component: () => import('@/views/archive.vue')
        }
    ]
});
export default router;