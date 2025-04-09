<template>
    <div>
        admin
    </div>

</template>

<script setup>
// 该接口需要传入pageNum和pageSize参数,同时需要携带token
import { authAdmin } from '../../../api'
import { reactive, onMounted } from 'vue'

const paginatonData = reactive({
    // 当前的页码
    pageNum: 1,
    // 每页显示的数量
    pageSize: 10,
})

onMounted(() => {
    authAdmin(paginatonData).then(({ data }) => {
        console.log('@@@@@@@@@@@authAdmin', data)
    })
})

</script>

<style lang="less" scoped></style>
