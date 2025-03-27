<template>
    <div class="flex items-center gap-2">
        <!-- -mr-2 用于抵消右边距 -->
        <img src="../images/1.jpg" class="h-16 w-auto -mr-2" />
        <img src="../images/1.jpg" class="h-16 w-auto" />

        <div class="flex items-center justify-between flex-[1]">
            <a href="#">首页</a>
            <a href="#">课程中心</a>
            <a href="#" class="flex items-center justify-center">
                <img src="https:////front.cdn.xdclass.net/images/vip_icon.webp" class="h-7 w-7" />
                <span>超级会员</span>
            </a>
            <a href="#">工具</a>

            <a href="#">
                <span>自学路线</span>
                <el-icon>
                    <ArrowDownBold />
                </el-icon>
            </a>
            <a href="#">
                <span>一对一辅导</span>
                <el-icon>
                    <ArrowDownBold />
                </el-icon>
            </a>
            <a href="#">
                <el-input v-model="input" class="w-60" placeholder="请输入搜索内容">
                    <template #append>
                        <el-icon>
                            <Search />
                        </el-icon>
                    </template>
                </el-input>
            </a>
            <a href="#">兑换码</a>
            <a href="#">云服务器</a>
        </div>
        <div>
            <el-button link size="large" @click="login">登录</el-button>
            <el-button link size="large" @click="register">注册</el-button>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue'
import { ArrowDownBold, Search } from "@element-plus/icons-vue"

const input = ref("")

const login = () => { }
const register = () => { }

</script>

<style scoped></style>