<template>
  <div class="common-layout">
    <el-container>
      <!-- <el-aside width="230px">Aside</el-aside> -->
      <Aside />
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import { RouterView } from 'vue-router';
import Aside from '../components/aside.vue'
import Header from '../components/navHeader.vue'

</script>
<style lang="less" scoped>
.common-layout {
  height: 100%;

  .el-container {
    height: 100%;

    .hearder-container {
      height: 60px;
    }
  }
}
</style>