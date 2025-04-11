import { createStore } from 'vuex'
import menu from './menu.js'
// 导入持久化插件,刷新时不会消失
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    // 实现持久化
    plugins: [new createPersistedState({
        // 设置缓存的名称
        key: 'pz_v3pz',
    }) ],
    modules: {
        menu
    }
})