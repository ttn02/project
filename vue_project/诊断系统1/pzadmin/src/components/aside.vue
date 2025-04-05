<template>
  <el-menu
    :style="{ width: isCollapse ? '84px' : '230px' }"
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="aside-container"
    default-active="2"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
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
const menuData = reactive(router.options.routes[0].children)
// console.log('menuData@@@@@@@@@@@@@@@@@', menuData);

// 创建 store 实例
const store = useStore()
const isCollapse = computed(() => store.state.menu.isCollapse)


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
