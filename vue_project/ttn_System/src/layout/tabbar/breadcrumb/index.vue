<template>
  <!-- 关闭菜单栏图标 -->
  <el-icon
    style="margin-right: 10px; cursor: pointer"
    size="20px"
    @click="changeIcon"
  >
    <!-- 动态的加载相应的组件 -->
    <component :is="LayOutSettingStore.isCollapse ? Expand : Fold"></component>
  </el-icon>
  <!-- 面包屑 :separator-icon="ArrowRight"表示的是分割符 ">"  -->
  <el-breadcrumb
    separator="/"
    :separator-icon="ArrowRight"
  >
    <!-- 面包屑匹配路由标题 
     用v-show来判断如果是一级标题就不用显示layout标题
     用to来点击标题跳转到相应的路由
     -->
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <!-- 渲染当前路由图标 -->
      <el-icon style="vertical-align: middle">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 渲染当前路由标题 -->
      <span style="margin: 0 5px; vertical-align: middle">
        {{ item.meta.title }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight, Fold, Expand } from '@element-plus/icons-vue'
import useLayOutSettingStore from '@/store/modules/setting'

let LayOutSettingStore = useLayOutSettingStore()
const changeIcon = () => {
  LayOutSettingStore.isCollapse = !LayOutSettingStore.isCollapse
}
</script>
<style lang="scss" scoped></style>
