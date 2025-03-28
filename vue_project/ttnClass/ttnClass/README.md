# Vue 3 + Vite

# 配置 vite

# 配置 router（路由）

# 配置 pinia

## 持久化数据化插件

- 安装插件`npm install pinia-plugin-persist`
- 在 mian.js 中引入`import piniaPersist from 'pinia-plugin-persist'`
- 把 piniaPersit 注册到 pinia 实例中`pinia.use(piniaPersit);`

# 配置 tailwindcss（还需要安装插件 `Tailwind CSS IntelliSense`）

- 注意安装版本时使用的是`npm install -D tailwindcss@^3.4.17 postcss autoprefixer`
- 版本号会影响`npx tailwindcss init`初始化的执行

<template>
  <el-dialog width="400px" v-model="modal.regVisible" class="relative">
    <div>
      <!-- 跳转登录 -->
    </div>
    <div class=" absolute w-full h-44px bottom-0 left-0 bg-[rgba(77,85,93,0.1)] flex items-center justify-center"></div>
    <span>已有账号？</span>
    <span class="text-blue-400 cursor-pointer" @click="
      () => {
        modal.switchRegVisible();
        modal.switchLoginVisible();
      }
    ">
      立即登录
    </span>
  </el-dialog>
</template>
