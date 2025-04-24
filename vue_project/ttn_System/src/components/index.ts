/*
 * @Description: Stay hungry，Stay foolish
 * @Author: ttn_02
 * @Date: 2025-05-22 22:08:06
 * @LastEditors: ttn_02
 * @LastEditTime: 2025-05-22 22:08:06
 */
import type { App } from 'vue'
import * as components from './components'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 方法名必须为 install
const install = function (app: App) {
  // 注册项目的自定义全局组件
  Object.entries(components).forEach(([key, value]) => {
    app.component(key, value)
  })
  // 注册 ElementPlus 的图标全局组件
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

export default install
export * from './components'
