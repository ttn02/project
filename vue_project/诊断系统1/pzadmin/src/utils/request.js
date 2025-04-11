import axios from 'axios'
import { ElMessage } from 'element-plus'

const http = axios.create({
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    // 自动给 `url` 添加前缀
    baseURL: 'https://v3pz.itndedu.com/v3pz',
    timeout: 30000 // 添加请求超时时间
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 获取token信息保存到浏览器本地
    const token = localStorage.getItem('pz_token')
    // 不需要添加没有token的api，就是没有Header请求头
    const whiteUrl = ['get/code', '/user/authentication', '/login']
    // 如果有token，并且不是白名单的api，则添加Header请求头
    if (token && !whiteUrl.includes(config.url)) { 
        // 把token添加到请求头里面的 X-token 
          config.headers['x-token'] = token
      }
      return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对接口异常的数据，给用户提示
    if (response.data.code === -1) {
        ElMessage.error(response.data.message)
  }
    // token发生修改或者是过期了
  if (response.data.code === -2) {
      // 清除当前的缓存记录
    localStorage.removeItem('pz_token')
    localStorage.removeItem('pz_userInfo')
    localStorage.removeItem('pz_v3pz')
    // 清除完后跳转到登录页面,跳转到当前页面的一个路由(window.location.origin)
    window.location.href = window.location.origin
    
    }
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});
  
export default http