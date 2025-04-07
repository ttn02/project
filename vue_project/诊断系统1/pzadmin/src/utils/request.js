import axios from 'axios'
import { ElMessage } from 'element-plus'

const http = axios.create({
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    // 自动给 `url` 添加前缀
    baseURL: 'https://v3pz.itndedu.com/v3pz',
    timeout: 10000 // 添加请求超时时间
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 获取token信息
    const token = localStorage.getItem('pz_token')
    // 不需要添加没有token的api，就是没有Header请求头
    const whiteUrl = ['get/code', '/user/authentication', '/login']
    if (token && whiteUrl.includes(config.url)) { 
        config.headers['X-token'] = token
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
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});
  
export default http