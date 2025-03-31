<template>
    <li :style="{ lineHeight: '50px' }"
        class="relative w-full cursor-pointer text-base pl-5 hover:bg-#3b4248 hover:text-red-500">
        <span>{{ props.item }}</span>
        <div class="absolute right-3 top-0.5 text-black text-sm" :type="{ lineHeight: '50px' }">
            <el-icon>
                <CareRight />
            </el-icon>
        </div>

    </li>

</template>

<script setup>
const props = defineProps(['item']);
</script>