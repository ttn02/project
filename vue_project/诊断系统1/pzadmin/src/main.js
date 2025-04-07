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


// 首屏优化
// 计算首屏加载时间
window.onload = function () {
  // 信能指标，用于计算首屏加载时间
  // 老方法
  console.log(performance.timing.domComplete - performance.timing.navigationStart)
  // 新方法
  const observer = new PerformanceObserver((list) => { 
    list.getEntries().forEach(entry => {
      console.log(entry.domComplete)
    })
  })
  observer.observe({entryTypes: ['navigation']})
}
// 使用异步来调用组件，减少首屏渲染时间
