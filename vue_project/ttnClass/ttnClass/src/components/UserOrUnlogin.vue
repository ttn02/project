<template>
    <div class="rounded shadow-[0_0_10px_0_#d7d7d7] flex items-center justify-center w-[190px] h-[380px]">
        <div v-if="user.isLogin" class="flex flex-col items-center justify-center h-full">
            <div>
                欢迎您：<span class="text-orange-500 font-bold">{{ user.users.account }}</span>
            </div>
            <el-button class="text-center bg-#ff602a cursor-pointer rounded leading-2" @click="user.logout">
                退出登录
            </el-button>
        </div>
        <div v-else class="flex flex-col items-center justify-center h-full">
            <img class="cursor-pointer max-w-[170px]" src="https://front.cdn.xdclass.net/images/new.webp" />
            <el-button
                class="text-center bg-#ff602a cursor-pointer rounded-[71px] w-[130px] h-[24px] text-[12px] p-2 leading-2"
                @click="modal.switchLoginVisible()">
                登录 / 注册
            </el-button>
        </div>
    </div>

</template>
<script setup>
import { useUserStore } from '../store/user.js';
import { useModalStore } from '../store/modal.js';
const user = useUserStore();
const modal = useModalStore();
</script>