<template>

  <!-- 对于有子菜单的情况下，使用递归实现，没有则直接显示 -->
  <template v-for="(item, index) in props.menuData">
    <!-- 没有子菜单则直接显示（判断标准：如果没有children属性，或者children属性为空数组） -->
    <!-- index和key都使用了模版字符串，将props.index和item.meta.id组合起来进行绑定，生成一个唯一的字符串，保证了唯一性，避免重复渲染 -->
    <el-menu-item
      @click="handleClick(item, `${props.index}-${item.meta.id}`)"
      v-if="!item.children || item.children.length == 0"
      :index="`${props.index}-${item.meta.id}`"
      :key="`${props.index}-${item.meta.id}`"
    >
      <el-icon size="20">
        <component :is="item.meta.icon">

        </component>
      </el-icon>
      <!-- 获取meta里面的name进行动态绑定显示 -->
      <span>{{ item.meta.name }}</span>
    </el-menu-item>
    <!-- 有子菜单的情况下，使用递归实现，递归调用本组件，传入子菜单数据 -->
    <el-sub-menu
      v-else
      :index="`${props.index}-${item.meta.id}`"
    >
      <template #title>
        <el-icon size="20">
          <component :is="item.meta.icon">

          </component>
        </el-icon>
        <span>{{ item.meta.name }}</span>
      </template>
      <!-- 在同一个文件里面，使用递归调用本组件，【props传入子菜单数据】，vue3的特性，可以实现组件的嵌套(用法:将组件名的驼峰命名改为短横线命名可调用自身) -->
      <!-- 外层传递什么内容，内层也要传递相应修改过的内容 -->
      <tree-menu
        :index="`${props.index}-${item.meta.id}`"
        :menuData="item.children"
      />
    </el-sub-menu>
  </template>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps(['menuData', 'index'])
// console.log('props@@@@@@@@@@@@@@@', props)

// 路由跳转功能
const router = useRouter()
// 点击 menu-item 实现路由跳转功能
const handleClick = (item, active) => {
  // console.log('item@@@@@@@@@@', item)
  router.push(item.meta.path)

}
</script>

<style scoped></style>
