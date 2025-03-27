<template>
    <div class="text-xs text-red-500">ttn</div>
    <span>{{ user.token }}</span>
    <el-button type="primary">登录</el-button>

</template>

<script setup>
import { useUserStore } from "../store/user.js"
const user = useUserStore()

</script>