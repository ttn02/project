<template>
  <el-dialog width="400px" v-model="modal.regVisible" class="relative">
    <h1 class="text-center c-#404040 text-2xl font-normal mb-1.5">
      账号注册
    </h1>
    <div class="pb-44px flex items-center justify-center w-full">
      <el-form name="register" class="w-full">
        <!-- 账号 -->
        <el-form-item label="账号:" name="account">
          <el-input v-model="account" placeholder="请输入账号" />
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码:" name="password">
          <el-input type="password" v-model="password" placeholder="请输入密码" />
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item label="确认密码:" name="re-password">
          <el-input type="password" v-model="rePassword" placeholder="请确认密码" />
        </el-form-item>
        <!-- 注册 -->
        <el-form-item>
          <div class="flex items-center justify-center w-full">
            <el-button type="primary" @click="handleFinish"
              class="flex items-center justify-center w-[50%] h-auto text-white rounded-full bg-#409eff">
              <span>立即注册</span>
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <!-- 跳转登录 -->
    </div>
    <div class="absolute w-full h-50px bottom-0 left-0 bg-[rgba(77,85,93,0.1)] flex items-center justify-center">
      <span>已有账号？</span>
      <span class="text-blue-400 cursor-pointer" @click="
        () => {
          modal.switchRegVisible();
          modal.switchLoginVisible();
        }
      ">
        立即登录
      </span>
    </div>

  </el-dialog>

</template>



<script setup>
import { ref } from 'vue';
import { useUserStore } from '../store/user.js';
import { useModalStore } from '../store/modal.js';
import { ElMessage } from 'element-plus';

const user = useUserStore();
const modal = useModalStore();

const account = ref("");
const password = ref("");
const rePassword = ref("");

function handleFinish() {
  // 密码验证
  if (password.value != rePassword.value) {
    ElMessage({
      message: '两次输入的密码不一致',
      type: 'warning'
    })
    return
  } else {
    // 账号验证
    if (user.users.account == account.value && user.users.password == password.value) {
      ElMessage({
        message: '该账号已存在',
        type: 'warning'
      })
    } else {
      // 注册
      user.register(account.value, password.value)
      modal.switchRegVisible()
      ElMessage({
        message: '注册成功',
        type: 'success'
      })
    }

  }
}

</script>

<style scoped></style>
