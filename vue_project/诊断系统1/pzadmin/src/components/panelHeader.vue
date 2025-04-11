<template>
    <!-- 写在main.js中，用于全局配置 -->
    <div class="panel-heading">
        <div class="panel-lead">
            <div class="title">{{ props.route.meta.name }}</div>
            <p class="description">{{ props.route.meta.describe }}</p>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    route: {
        // 获取当前路由对象信息
        type: Object,
    }
})
</script>
<style scoped>
.panel-heading {
    padding: 15px;
    background: #e8edf0;
    border-color: #e8edf0;
    position: relative;

    .panel-lead {
        font-size: 14px;

        .title {
            font-weight: bold;
            font-style: normal;
        }

        .description {
            margin-top: 5px;
        }
    }
}
</style>