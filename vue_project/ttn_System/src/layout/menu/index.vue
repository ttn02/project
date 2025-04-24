<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: ttn_02
 * @Date: 2025-05-22 22:08:06
 * @LastEditors: ttn_02
 * @LastEditTime: 2025-05-22 22:08:06
-->

<template>
  <template
    v-for="(item, index) in menuList"
    :key="item.path"
  >
    <!-- 没有子路由不需要el-menu-item折叠，直接使用el-menu-item -->
    <template v-if="!item.children">
      <el-menu-item
        v-if="!item.meta.hidden"
        :index="item.path"
      >
        <!-- 图标 -->
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <!-- 调用插槽，自定义标题内容 -->
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由但只有一个的home页面不需要折叠 --home -->
    <template v-if="item.children && item.children.length === 1 && item.path === '/'">
      <!-- 默认路由是全部显示在菜单栏，拿到元信息中hidden判断是否该路由需要隐藏 -->
      <!-- 外层template看有没有孩子路由，内层el-menu-item用于判断该路由是否需要隐藏 -->
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <!-- 调用插槽，自定义标题内容 -->
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由但只有一个且不是home不需要折叠 --not home -->
    <template v-if="item.children && item.children.length === 1 && item.path !== '/'">
      <el-sub-menu :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>

        <el-menu-item
          v-if="!item.children[0].meta.hidden"
          :index="item.children[0].path"
        >
          <el-icon>
            <component :is="item.children[0].meta.icon"></component>
          </el-icon>
          <!-- 调用插槽，自定义标题内容 -->
          <template #title>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
    </template>
    <!-- 有子路由且大于一个，:index是唯一标识符，不加会乱套 -->
    <el-sub-menu
      v-if="item.children && item.children.length > 1"
      :index="item.path"
    >
      <!-- 调用插槽，自定义标题内容 -->
      <template #title>
        <el-icon>
          <!-- 是一个占位符组件，用:is 动态的调用某个组件 -->
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <!-- 递归组件 自己调用自己，渲染子路由（注意：递归组时需要有名字） -->
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>
<!-- 使用递归组件时必须要有名字，这里是Menu -->
<script setup lang="ts" name="Menu">
defineProps(['menuList'])
</script>
<style lang="scss" scoped></style>
