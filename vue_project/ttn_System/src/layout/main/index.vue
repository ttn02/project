<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: ttn_02
 * @Date: 2025-05-22 22:08:06
 * @LastEditors: ttn_02
 * @LastEditTime: 2025-05-22 22:08:06
-->
<template>
  <!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }">
    <!-- 过渡动画效果 -->
    <transition name="fade">
      <component
        :is="Component"
        v-if="flag"
      />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
import { watch, ref, nextTick } from 'vue'


let layOutSettingStore = useLayOutSettingStore()

let flag = ref(true)
watch(
  () => layOutSettingStore.refsh,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<style lang="scss" scoped>
// 添加过渡动画的样式
// 进入时的状态，透明度为零，缩放为零
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

// 维持时间为 0.3s
.fade-enter-active {
  transition: all 0.3s;
}

// 进入后的状态，透明度为一，缩放为一
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
