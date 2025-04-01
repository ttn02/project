<template>
    <div class="flex flex-col gap-8 mt-10">
        <CardContainer v-for="item in data" key="{index} " :title="item.name" :summay="item.summay"
            :productList="item.productList.slice(0, 4)" />

    </div>

</template>
<script setup>
import CardContainer from './CardContainer.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';

const data = ref("");

onMounted(async () => {
    try {
        const response = await axios.get(' https://api-v2.xdclass.net/api/card/v1/list');
        console.log(response);
        // 将请求的数据赋值给cards
        data.value = response.data.data;
    } catch (error) {
        console.log(error); // 打印错误信息

    }
});  
</script>
