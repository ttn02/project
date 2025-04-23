/*
 * @Description: Stay hungry，Stay foolish
 * @Author: ttn_02
 * @Date: 2025-05-22 22:08:06
 * @LastEditors: ttn_02
 * @LastEditTime: 2025-05-22 22:08:06
 */
import { createApp } from 'vue'
import App from '@/App.vue'
// svg插件需要配置代码
import 'virtual:svg-icons-register'
// 引入自定义插件对象：注册整个项目全局组件
import globalComponent from '@/components/index'
import 'element-plus/theme-chalk/el-notification.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/index.scss'
import router from './router'
import pinia from './store'
import './permission'
import { isHasButton } from './directive/has'

const app = createApp(App)
isHasButton(app)
// 注册全局组件，直接使用install方法
app.use(globalComponent)
app.use(router)
// 安装仓库
app.use(pinia)
app.mount('#app')
