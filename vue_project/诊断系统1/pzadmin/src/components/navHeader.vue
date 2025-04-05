<template>
    <div class="header-container">
        <div class="header-left flex-box">
            <el-icon
                class="icon"
                size="20"
                @click="store.commit('collapseMenu')"
            >
                <Fold />
            </el-icon>
        </div>
        <div class="header-right">
            <el-dropdown>
                <div class="el-droopdown-link flex-box">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    <p class="user-name">TTN</p>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item divided>Action 5</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

    </div>
</template>
<script setup>
import { useStore } from 'vuex'

const store = useStore()

</script>
<style scoped>
.flex-box {
    display: flex;
    align-items: center;
}

.header-container {
    display: flex;
    /* 第一个子元素靠左对齐。 最后一个子元素靠右对齐。 剩余子元素​​均匀分布​​在两者之间 */
    justify-content: space-between;
    /* 水平方向居中 */
    align-items: center;
    height: 100%;
    background-color: #fff;
    padding-right: 25px;

    .header-left {
        display: flex;
        align-items: center;
        height: 100%;

        .icon {
            width: 45px;
            height: 100%;
        }

        /* 鼠标悬停时，背景颜色变为 #f5f5f5，鼠标指针变为 pointer。 */
        .icon:hover {
            background-color: #f5f5f5;
            cursor: pointer;
        }
    }

    .header-right {
        .user-name {
            margin-left: 10px;
        }
    }

}
</style>