<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: ttn_02
 * @Date: 2025-05-22 22:08:06
 * @LastEditors: ttn_02
 * @LastEditTime: 2025-05-22 22:08:06
-->

<template>
  <el-container
    class="layout-container-demo"
    style="height: 100vh"
  >
    <!-- 左侧菜单栏 -->
    <el-aside
      width="200px"
      :class="{ isCollapse: LayOutSettingStore.isCollapse ? true : false }"
    >
      <!-- 带滚动条的菜单栏 -->
      <el-scrollbar>
        <!-- 需要限制菜单栏的高度等于 视口的高度 - logo图标的高度 -->
        <!-- :default-active="$route.path" 当匹配到的唯一标识（这里的唯一标识为路由路径）默认打开菜单栏，刷新时直接跳转到该菜单栏的子项 -->
        <el-menu
          :default-active="$route.path"
          active-text-color="#fff"
          background-color="#001529"
          text-color="#959ea6"
          :collapse="LayOutSettingStore.isCollapse"
          :router="true"
        >
          <Logo />
          <!-- 根据路由动态生成菜单  -->
          <Menu :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container class="container">
      <!-- 顶部导航栏 -->
      <TabBar style="width: 100%" />
      主要内容部分
      <el-main :style="{
        left: !LayOutSettingStore.isCollapse ? '200px' : '56px',
        width: LayOutSettingStore.isCollapse
          ? 'calc(100% - 56px)'
          : 'calc(100% - 200px)',
      }">
        <el-scrollbar>
          <Main />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
// 引入左侧菜单logo组件
import Logo from './logo/index.vue'
// 引入左侧菜单栏组件
import Menu from './menu/index.vue'
// 引入顶部导航栏组件
import TabBar from './tabbar/index.vue'
// 引入右侧主要内容组件
import Main from './main/index.vue'
// 引入关闭菜单栏的指令相关仓库
import useLayOutSettingStore from '@/store/modules/setting'
// 引入用户相关仓库
import useUserStore from '@/store/modules/user'
import { useRoute } from 'vue-router'

// 从仓库里面拿到路由数据
let userStore = useUserStore()
let $route = useRoute()

let LayOutSettingStore = useLayOutSettingStore()
</script>
<style lang="scss" scoped>
.layout-container-demo {
  height: 100%;
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  position: absolute;
  padding: 20px;
  left: 200px;
  top: 60px;
  // 用于设置过渡动画
  transition: all 0.3s;
  width: calc(100% - $base-menu-width);
  height: calc(100vh - 60px);
}

.el-aside {
  background-color: #001529 !important;
  transition: all 0.3s;
}

.el-header {
  background-color: #fff !important;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  z-index: 999;
}

.isCollapse {
  width: 56px;
}

@media screen and (max-width: 768px) {
  .el-aside {
    position: fixed;
    left: -200px;
    top: 0;
    bottom: 0;
    z-index: 1000;

    &.isCollapse {
      left: 0;
    }
  }

  .el-main {
    left: 0 !important;
    width: 100% !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }

  .container {
    margin-left: 0;
  }
}
</style>
