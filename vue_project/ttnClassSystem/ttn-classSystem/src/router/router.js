import { createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home' //重定向到home页面
    },
    {
        path: '/home',
        component: () => import("../pages/home.vue")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router