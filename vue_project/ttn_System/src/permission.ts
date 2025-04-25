/*
 * @Description: Stay hungry，Stay foolish
 * @Author: ttn_02
 * @Date: 2025-05-22 22:08:06
 * @LastEditors: ttn_02
 * @LastEditTime: 2025-05-22 22:08:06
 */
// 路由鉴权
import router from '@/router'
// 引入title用于动态生成标题
import setting from './setting'
// 进度条插件 （ 开始 nprogress.start() 结束 nprogress.done() ）
import nprogress from 'nprogress'
// 引入进度条样式才可以使用（可以在node_modules/nprogress/nprogress.css里面更改样式）
import 'nprogress/nprogress.css'
// 由于路由守卫在组件外部（跟main.ts同级） 想要获取小仓库的数据 就需要先获取大仓库
import pinia from './store'
import useUserStore from './store/modules/user'

// 取消进度条加载的小圆球
nprogress.configure({ showSpinner: false })

// 在 Vue 组件中，通常不需要显式传递 pinia（Pinia 会自动从 Vue 应用的上下文中获取）。
// 在​​非组件环境​​（如普通 JS/TS 文件）中，需手动传入 pinia 实例，确保 Store 绑定到正确的 Pinia。
let userStore = useUserStore(pinia)

// 全局前置守卫：访问某一个路由之前的一个守卫
// to 要访问的路由（目标路由）
// from 从哪个路由跳转过来的（当前路由）
// next 放行函数
router.beforeEach(async (to, from, next) => {
  // 动态更改标题
  document.title = to.meta.title + ` | ${setting.title}`
  // 跳转路由前进度条开始滚动（需要安装插件 pnpm i nprogress）
  nprogress.start()
  let token = userStore.token
  let username = userStore.username
  // 用户登录(token存在表示登录，反之未登录)
  if (token) {
    //  登录成功
    if (to.path === '/login') {
      // 如果是登录页面，则跳转首页
      next({ path: '/' })
    } else {
      // 如果是其他页面，则判断有用户信息才能访问
      if (username) {
        // 有用户信息，则放行
        next()
      } else {
        // 这里可以看本地是否有用户信息，如果有则直接获取，没有则发请求获取
        try {
          // 没有用户信息，则发请求获取用户信息再放行
          await userStore.userInfo()
          next({ ...to })
        } catch (error) {
          // 1、token过期 导致无法获取用户信息
          // 2、用户手动清除token 导致无法获取用户信息
          // 退出登录并清楚用户相关信息
          await userStore.userLogout()
          // 携带一个query参数，把用户退出登录的当前路由存起来，再次登陆后跳转回该路由
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 用户未登录
    if (to.path == '/login') {
      next()
    } else {
      // 携带一个query参数，把你未登陆前想去的路由存起来，登陆后跳转该路由
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
// 全局后置守卫

router.afterEach((route) => {
  // 进度条结束
  nprogress.done()
})

// 用户未登录 只能访问login路由
// 用户已登录 不可以访问login 可以访问其他路由
// 根据token判断用户是否登录 登陆后才有token
