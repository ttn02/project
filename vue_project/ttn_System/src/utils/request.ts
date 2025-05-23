/*
 * @Description: Stay hungry，Stay foolish
 * @Author: ttn_02
 * @Date: 2025-05-22 22:08:06
 * @LastEditors: ttn_02
 * @LastEditTime: 2025-05-22 22:08:06
 */
// 二次封装axios
import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'

// create方法创建axios实例（其他配置：基础路径，超时时间）
const request = axios.create({
  // 基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径携带/api
  timeout: 5000,
})

request.interceptors.request.use(
  (config) => {
    // 获取仓库内部token，登录以后携带给服务器
    // config配置对象，hearders属性请求头，经常给服务器端携带公共参数token
    let userStore = useUserStore()

    if (userStore.token) {
      config.headers.token = userStore.token
    }
    // 返回配置对象
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  // 成功的回调
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response.data)
    }
  },
  // 失败的回调：处理http网络错误
  (error) => {
    // 定义一个变量，存储错误信息
    let message = ''
    // http状态码
    let status = error.response.status
    switch (status) {
      // 401: 未登录
      // 未登录则跳转登录页面，并携带当前页面的路径
      // 在登录成功后返回当前页面，这一步需要在登录页操作。
      case 401:
        message = '未登录'
        break
      // 403 token过期
      // 登录过期对用户进行提示
      // 清除本地token和清空vuex中token对象
      // 跳转登录页面
      case 403:
        message = '登录过期，请重新登录'
        break
      case 404:
        message = '网络请求不存在'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        // 其他错误，直接抛出错误提示（如：网络错误）
        message = error.response.data.message
        break
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)

export default request
