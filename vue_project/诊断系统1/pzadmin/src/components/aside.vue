<template>
  <el-menu
    :style="{ width: isCollapse ? '84px' : '230px' }"
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="aside-container"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    :default-active="active"
  >
    <p class="loge-lg">{{ isCollapse ? 'TTN' : 'TTN陪诊' }}</p>
    <TreeMenu
      :index="1"
      :menuData="menuData"
    />

  </el-menu>

</template>

<script setup>
import TreeMenu from './treeMenu.vue'
import { useRouter } from 'vue-router'
import { reactive, computed } from 'vue'
// 创建 store 实例
import { useStore } from 'vuex'


const router = useRouter()
// console.log('router@@@@@@@@@@@@@', router);

// 创建 store 实例
const store = useStore()
const isCollapse = computed(() => store.state.menu.isCollapse)

// 一开始的路由数据写死的，在使用动态路由后，后面改成从 store 里获取
// const menuData = reactive(router.options.routes[0].children)
// 使用动态路由后
const menuData = computed(() => store.state.menu.routerList)
// console.log('menuData@@@@@@@@@@@@@@@@@', menuData);

const active = computed(() => store.state.menu.menuActive)

const handleOpen = () => { }
const handleClose = () => { }


</script>

// 安装less(npm i less@4.2.1)
// 使用 lang="less" scoped
<style lang="less" scoped>
.aside-container {
  height: 100%;

  .loge-lg {
    font-size: 20px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #fff;
  }
}
</style>
