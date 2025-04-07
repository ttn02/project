const state = {
    isCollapse: false,
    selectMenu:[]
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

    }
}

export default {
    state,
    mutations
}