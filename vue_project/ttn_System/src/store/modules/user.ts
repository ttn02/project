/*
 * @Description: Stay hungry，Stay foolish
 * @Author: ttn_02
 * @Date: 2025-05-22 22:08:06
 * @LastEditors: ttn_02
 * @LastEditTime: 2025-05-22 22:08:06
 */

// 用户相关的小仓库
import { defineStore } from 'pinia'
import router from '@/router'
import { reqLogin, reqUserInfo, reqLogOut } from '@/api/user'
import { RouteRecordRaw } from 'vue-router'
import type {
  LoginFormData,
  LoginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
import type { UserState } from './types/types'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import cloneDeep from 'lodash/cloneDeep'

let dynamicRoutes: RouteRecordRaw[] = []

function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

const useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN()!,
      menuRoutes: constantRoute, // 生成菜单所需要的路由
      username: '',
      avatar: '',
      buttons: [],
    }
  },
  // 异步|逻辑的地方
  actions: {
    //用户登录方法
    async userLogin(data: LoginFormData) {
      const res: LoginResponseData = await reqLogin(data)
      // success=>token
      // error=>error.message
      if (res.code === 200) {
        this.token = res.data as string
        // 持久化，SET_TOKEN自定义封装在utils/token.ts中
        SET_TOKEN(res.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data as string))
      }
    },
    async userInfo() {
      // 获取用户仓库中的token信息
      const res: userInfoResponseData = await reqUserInfo()
      // 如果获取用户信息成功，存储一下用户信息
      if (res.code === 200) {
        this.username = res.data.name as string
        this.avatar = res.data.avatar as string

        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoute),
          res.data.routes,
        )
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]
        dynamicRoutes = [...userAsyncRoute, anyRoute] // 记录动态添加的路由
        dynamicRoutes.forEach((route) => {
          router.addRoute(route) // 动态添加路由
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    async userLogout() {
      const res = await reqLogOut()
      if (res.code === 200) {
        // 退出登录，清除token和用户选项
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        dynamicRoutes.forEach((route) => {
          if (route.name) {
            router.removeRoute(route.name)
          }
        })
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
  },
  // 计算属性
  getters: {},
})

export default useUserStore
