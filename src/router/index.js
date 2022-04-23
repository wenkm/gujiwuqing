/*
* @Author: Kevin
* @Date: 2022-04-22 13:00:56
* @Description: 路由配置
*/
import {createRouter, createWebHistory} from 'vue-router';
import axios from '@/axios';
import Home from '@/views/home.vue';
const router = createRouter({
    history: createWebHistory(),
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
        },
        {
            path: '/view/:id',
            props: true,
            component: () => import('@/views/view.vue')
        }
    ]
});

router.beforeEach((to, from ,next) => {
    if (!sessionStorage.getItem('articles')) {
        axios(`/article?pageNo=1&pageSize=100`).then(({data: {list}}) => {
            sessionStorage.setItem('articles', JSON.stringify(list));
            next();
        }).catch(() => {
            axios(`/_next/data/article.json`).then(({data: {list}}) => {
                sessionStorage.setItem('articles', JSON.stringify(list));
                next();
            });
        })
    } else {
        next();
    }
});

export default router;