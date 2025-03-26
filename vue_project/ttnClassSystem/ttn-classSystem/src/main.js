import { createApp } from 'vue'
import App from './App.vue'
// 配置路由
import router from './router/router.js'
// 配置pinia
import { createPinia } from 'pinia'
// 配置element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './tailwindcss.css' 

const app = createApp(App)
const pinia = createPinia()

// 循环遍历element-plus的icon组件，注册到vue实例中
Object.keys(ElementPlusIconsVue).forEach((keys) => {    
  app.component(keys, ElementPlusIconsVue[keys])
})



app.use(router).use(pinia).use(ElementPlus)
app.mount('#app')