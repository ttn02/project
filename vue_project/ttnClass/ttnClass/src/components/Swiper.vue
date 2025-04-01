<template>
    <!-- 走马灯 -->
    <el-carousel :interval="3000" arrow="always" :style="{ height: '380px', width: '800px' }" indicator-position="none">
        <el-carousel-item>
            <img class="rounded" src="https://file.xdclass.net/video/2023/banner/618/HD.png">
        </el-carousel-item>
        <el-carousel-item>
            <img class="rounded" src="https://file.xdclass.net/video/2023/banner/618/JD.png">
        </el-carousel-item>
        <el-carousel-item>
            <img class="rounded" src="https://file.xdclass.net/video/2022/22-11.11/aly.jpeg">
        </el-carousel-item>
        <el-carousel-item>
            <img class="rounded" src="../images/1.jpg">
        </el-carousel-item>

    </el-carousel>
</template>
<script setup>
</script>
<style scoped>
.el-carousel__item h3 {
    opacity: 0.75;
    line-height: 380px;
    margin: 0;
    text-align: center;
}

:deep(.el-carousel__item) {
    height: 380px !important;

}

:deep(.el-carousel__container) {
    background-color: white !important;

}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>