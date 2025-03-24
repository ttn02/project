<template>
    <div>
        ttn课堂
    </div>
    <span>{{ user.token }}</span>
</template>

<script setup>
import useUserStore from "../store/user.js";
const user = useUserStore();

</script>