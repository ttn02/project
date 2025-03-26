<script setup>
import { useUserStore } from "../store/user.js";
const user = useUserStore();

</script>

<template>
    <div>
        ttn课堂
    </div>
    <span>{{ user.token }}</span>
    <br>
    <el-button type="primary"> 登录 </el-button>

</template>