import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.mount('#app')
app.use(router)
app.use(pinia)