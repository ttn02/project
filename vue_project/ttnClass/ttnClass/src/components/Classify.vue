<template>
    <div class="rounded shadow-[0_0_10px_0_#d7d7d7]">
        <ul>
            <!-- 这里li标签进行了重新封装 -->
            <ClassifyItem v-for="(item, index) in list" :key="index" :item="item" />
        </ul>
    </div>

</template>
<script setup>
import ClassifyItem from './ClassifyItem.vue';
const list = [
    "前端 | 全栈",
    "前端 | 全栈",
    "前端 | 全栈",
    "前端 | 全栈",
    "前端 | 全栈",
    "前端 | 全栈",
    "前端 | 全栈",
];
</script>