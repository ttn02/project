import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'



const app = createApp(App)

// 全局注册element-plus的icon组件库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 挂载路由
app.use(router)
// 挂载vuex(store挂载)
app.use(store)
app.mount('#app')
