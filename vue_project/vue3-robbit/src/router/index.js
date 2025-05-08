import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/index.vue'
import Login from '@/views/login/index.vue'
import Category from '@/views/category/index.vue'
import Layout from '@/views/layout/index.vue'
import SubCategory from '@/views/subCategory/index.vue'
import Detail from '@/views/detail/index.vue'
import CartList from '@/views/cartList/index.vue'
import CheckOut from '@/views/checkout/index.vue'
import Pay from '@/views/pay/index.vue'
import PayBack from '@/views/pay/PayBack.vue'
import Member from '@/views/member/index.vue'
import UserInfo from '@/views/member/components/UserInfo.vue'
import UserOrder from '@/views/member/components/UserOrder.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('@/views/layout/index.vue'),
            children: [
                {
                    path: '',
                    component: () => import('@/views/home/index.vue'),
                },
                {
                    path: 'category/:id',
                    component: () => import('@/views/subCategory/index.vue')
                },
                {
                    path: 'category/sub/:id',
                    component: () => import('@/views/subCategory/index.vue')
                },
                {
                    path: 'detail/:id',
                    component: () => import('@/views/detail/index.vue')
                },
                {
                    path: 'cartlist',
                    component: () => import('@/views/cartList/index.vue')
                },
                {
                    path: 'checkout',
                    component: () => import('@/views/checkout/index.vue')
                },
                {
                    path: 'pay',
                    component: () => import('@/views/pay/index.vue')
                },
                {
                    path: 'paycallback',
                    component: () => import('@/views/pay/PayBack.vue')
                },
                {
                    path: 'member',
                    component: () => import('@/views/member/index.vue'),
                    children: [
                        {
                            path: '',
                            component: () => import('@/views/member/components/UserInfo.vue')
                        },
                        {
                            path: 'order',
                            component: () => import('@/views/member/components/UserOrder.vue')
                        },
                    ]
                },
            ]
        },
        {
            path: '/login',
            component: () => import('@/views/login/index.vue')
        }
    ],
    //路由滚动行为定制
    scrollBehavior() {
        return { top: 0 }
    }
})

export default router
