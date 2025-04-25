// 统一管理用户相关接口
import request from '@/utils/request'
import type {
  LoginFormData,
  LoginResponseData,
  userInfoResponseData,
} from './type'

// 统一管理接口
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 登录接口方法，发请求时携带账号密码参数data，返回token和用户信息
export const reqLogin = (data: LoginFormData) =>
  request.post<any, LoginResponseData>(API.LOGIN_URL, data)

// 获取用户信息接口方法，通过请求拦截器携带参token，不需要携带参数，返回用户信息
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL)

// 退出登录接口方法，通过请求拦截器携带参token，不需要携带参数，返回空
export const reqLogOut = () => request.post<any, any>(API.LOGOUT_URL)
