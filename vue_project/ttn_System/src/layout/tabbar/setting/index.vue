<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: ttn_02
 * @Date: 2025-05-22 22:08:06
 * @LastEditors: ttn_02
 * @LastEditTime: 2025-05-22 22:08:06
-->
<template>
  <!-- 圆形的刷新按钮 -->
  <el-button
    circle
    size="small"
    :icon="Refresh"
    @click="updateRefsh"
  />
  <!-- 全屏按钮 -->
  <el-button
    circle
    size="small"
    :icon="FullScreen"
    @click="fullScreen"
  />
  <el-popover
    placement="bottom"
    title="主题设置"
    :width="200"
    trigger="hover"
  >
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          v-model="color"
          show-alpha
          :predefine="predefineColors"
          size="small"
          @change="setColor"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          v-model="dark"
          size="small"
          inline-prompt
          active-icon="MoonNight"
          inactive-icon="Sunny"
          @change="changeDark"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button
        circle
        size="small"
        :icon="Setting"
      />
    </template>
  </el-popover>

  <img
    :src="userStore.avatar"
    alt=""
  />
  <!-- 退出登录的下拉菜单 -->
  <el-dropdown>
    <span
      class="el-dropdown-link"
      style="cursor: pointer"
    >
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import {
  Refresh,
  Setting,
  FullScreen,
  ArrowDown,
} from '@element-plus/icons-vue'
import useLayOutSettingStore from '@/store/modules/setting'
let layoutSettingStore = useLayOutSettingStore()
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
let $router = useRouter()
let $route = useRoute()
let userStore = useUserStore()
let dark = ref<boolean>(false)

const updateRefsh = () => {
  layoutSettingStore.refsh = !layoutSettingStore.refsh
}

const fullScreen = () => {
  // DOM对象属性 判断当前是否为全屏，全屏返回true，否则返回null
  let full = document.fullscreenElement
  if (!full) {
    // 用于设置全屏
    document.documentElement.requestFullscreen()
  } else {
    // 用于退出全屏
    document.exitFullscreen()
  }
}

// 退出登录点击回调
const logout = async () => {
  // 第一件事 向服务器发请求 退出登录的接口（本次登录的token无效）
  // 第二件事 本地清除用户信息
  // 第三件事 跳转到登录页面
  await userStore.userLogout()
  // 跳转到登录页面
  // 调用 push 里面的 query 参数，当退出登录时，用 redirect 重定向到退出登录时所在的页面
  // 在登陆login时判断有没有携带query参数，有的话就重定向到该页面
  $router.push({ path: '/login', query: { redirect: $route.path } })
}

const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

const changeDark = () => {
  let html = document.documentElement
  dark.value ? (html.className = 'dark') : (html.className = '')
}

const setColor = () => {
  let html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}
</script>

<style lang="scss" scoped>
img {
  width: 24px;
  height: 24px;
  border-radius: 20px;
  margin: 0 10px;
}
</style>
