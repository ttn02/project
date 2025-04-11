import {createRouter, createWebHashHistory} from 'vue-router'

import  Layout  from  '../views/Main.vue'
import  Login  from  '../views/login/index.vue'
import Admin from '../views/auth/admin/index.vue'
import Group from '../views/auth/group/index.vue'
import Order from '../views/vppz/order/index.vue'
import Staff from '../views/vppz/staff/index.vue'
import Dashboard from '../views/dashboard/index.vue'

const localData = localStorage.getItem('pz_v3pz')

const routes = [
    { 
      path: '/',
      component: Layout,
      name: 'main',
        // 接收一个函数（to）,从动态路由里面获取路由信息，然后进行重定向到指定页面
      redirect: to => {
        if (localData) {
          // 如果有子菜单
          const child = JSON.parse(localData).menu.routerList[0].children
          if (child) {
            // 并且子菜单存在
            return child[0].meta.path
          } else {
            return JSON.parse(localData).menu.routerList[0].meta.path
          }
        } else {
          // 如果连缓存都不存在，直接跳转到根路径
          return '/'
          }
        },
    children: [
        // 使用动态路由从后端获取路由信息则不需要固定路由
        // {
        //   path: 'dashboard',
        //   meta: { id: '1', name: '控制台', icon: 'Platform', path: '/dashboard', describe: '用于展示当前系统中的统计数据、统计报表及重要实时数据' },
        //   component: Dashboard
        // },
        // {
        //   path: 'auth',
        //   meta: { id: '2' ,name: '权限管理', icon: 'Grid' },
        //   children: [
        //     {
        //       path: '',
        //       // alias 用于设置别名，可以匹配到多个路由（默认父路由的子路由,类似于重定位）
        //       alias: ['admin'],
        //       meta: { id: '1', name: '账号管理', icon: 'Avatar', path: '/auth/admin', describe: '管理员可以进行编辑，权限修改后需要登出才会生效' },
        //       component: Admin
        //     },
        //     {
        //       path: 'group',
        //       meta: { id: '2', name: '菜单管理', icon: 'Menu', path: '/auth/group', describe: '菜单规则通常对应一个控制器的方法,同时菜单栏数据也从规则中获取' },
        //       component: Group
        //     }
        //   ]
        // },
        // {
        //   path: 'vppz',
        //   meta: { id: '3', name: 'TTN陪诊', icon: 'BellFilled' },
        //   children: [
        //     {
        //       path: '',
        //       alias: ['staff'],
        //       meta: { id: '1', name: '陪护管理', icon: 'Checked', path: '/vppz/staff', describe: '陪护师可以进行创建和修改，设置对应生效状态控制C端选择' },
        //       component: Staff
        //     },
        //     {
        //       path: 'order',
        //       meta: { id: '2', name: '订单管理', icon: 'List', path: '/vppz/order', describe: 'C端下单后可以查看所有订单状态，已支付的订单可以完成陪护状态修改' },
        //       component: Order
        //     }
        //   ]
        // }
      ]
    },
    {
      path: '/login',
      component: Login
    },
  ]
  

const router = createRouter({
    //路由数据
    routes,
    // 路由匹配模式
    history: createWebHashHistory(),

})
export default router