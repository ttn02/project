import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import PanelHead from './components/panelHeader.vue'

// 如果使用CDN引入，请删除下面一行
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 前置导航守卫(to为跳转的路径，from为从哪里跳转的)
router.beforeEach(( to,from) => {
    // 这里可以做一些全局的前置操作，比如判断是否登录，是否有权限等
  const token =localStorage.getItem('pz_token')
  // 非登录页面跳转，如果token不存在且不在登录页面，则跳转到登录页面
  if (!token && to.path !== '/login') {
      return '/login'
  } else if (token && to.path === '/login') { 
      return '/'
  } else {
    return true
  }
})

const app = createApp(App)

// 全局注册element-plus的icon组件库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 全局注册自定义组件,传入组件名称和内容
app.component('PanelHead', PanelHead)

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
