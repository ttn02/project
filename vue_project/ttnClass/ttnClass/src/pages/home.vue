<template>
    <!-- <div class="text-xs text-red-500">ttn</div>
    <span>{{ user.token }}</span>
    <el-button type="primary">登录</el-button> -->

    <div>
        <!-- 海报图 -->
        <img src="https://file.xdclass.net/video/2023/banner/618/QD.gif" class="w-[100%] h-full mb-4" />

        <!-- 头部导航 -->
        <div class="rounded shadow-[0_0_10px_0_#d7d7d7] mb-[10px] w-[1200px] mx-auto">
            <Header />
        </div>

        <!-- 主要内容部分 -->

        <div class="w-[1200px] mx-auto mt-4 mb-4">
            <div class="flex items-center justify-between">
                <!-- 分类导航 -->
                <Classify />
                <!-- 轮播图 -->
                <Swiper />
                <!-- 新人福利 -->
                <UserOrUnlogin />

            </div>
            <!-- 高单价导航 -->
            <CourseList />
            <!-- 课程分类列表 -->
            <Card />

        </div>
        <!-- 底部的内容导航 -->

    </div>
    <!-- 提醒登录浮层组件（弹窗） -->

</template>

<script setup>
// import { useUserStore } from "../store/user.js"
// const user = useUserStore()
import Header from '@/components/Header.vue';
import Classify from '../components/Classify.vue';
import Swiper from '../components/Swiper.vue';
import UserOrUnlogin from '../components/UserOrUnlogin.vue';
import Card from '../components/Card.vue';
import CourseList from '../components/CourseList.vue';

</script>
