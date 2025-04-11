// 设置持久化存储菜单数据
const localData = localStorage.getItem('pz_v3pz')

// 判断如果本地菜单存在，则将菜单数据设置为本地菜单数据，否则设置为默认数据
const state = localData ? localData.menu : {
    isCollapse: false,
    selectMenu: [],
    routerList: []
}
const mutations = {
    collapseMenu(state) {
        state.isCollapse = !state.isCollapse
    },
    addMenu(state,payload) { 
        // 对数据进行去重，判断路径是否存在，不存在则添加路径
        if (state.selectMenu.findIndex(item => item.path === payload.path) === -1) {
            state.selectMenu.push(payload)
        }
    },
    closeMenu(state, payload) { 
        // 找到点击数据的索引
        const index = state.selectMenu.findIndex(val => val.name === payload.name)
        // 通过索引删除数组指定元素(找到当前索引，删除索引往后的一个元素，包括当前索引)
        state.selectMenu.splice(index, 1)
    },
    dynamicMenu(state, payload) {
        console.log('@@@@@@@@@@@@@@@@@@payload',payload)
        // 通过glob导入文件,**代表多少级目录，*代表文件名（对照自己目录结构进行分配）
        const modules = import.meta.glob('../views/**/**/*.vue')
        console.log('@@@@@@@@@@@modules', modules)
        function routerSet(router) {
            // 遍历路由,判断是否有子菜单
            router.forEach(route => {
                 // 如果没有子菜单，需要拼接路由数据
                 if (!route.children) {
                const url = `../views${route.meta.path}/index.vue`
                // 拿到获取的vue组件，通过键值的形式拿到modules的值，赋值给component
                route.component = modules[url]
                 } else {
                     // 如果有子菜单，递归调用routerSet函数
                     routerSet(route.children)
                 } 
            })
            
        }
        routerSet(payload)
        // 拿到完整的路由数据
        state.routerList = payload
    }
}

export default {
    state,
    mutations
}