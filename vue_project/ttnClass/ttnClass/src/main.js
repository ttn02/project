import { createApp } from "vue";
import App from "./App.vue";
// 配置路由
import router from "./router/router.js";
// 配置pinia
import { createPinia } from "pinia";
// 配置element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// 配置tailwindcss
import "./tailwindcss.css";
// 引入pinia的Store数据持久化插件
import piniaPersit from "pinia-plugin-persist";

const app = createApp(App);
const pinia = createPinia();

// 循环遍历element-plus的icon组件，注册到vue实例中
Object.keys(ElementPlusIconsVue).forEach((keys) => {
  app.component(keys, ElementPlusIconsVue[keys]);
});

// 把piniaPersit注册到pinia实例中
pinia.use(piniaPersit);

// 把pinia、路由、element-plus注册到vue实例中
app.use(pinia);
app.use(router);
app.use(ElementPlus);

app.mount("#app");
