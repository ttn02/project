<template>
  <el-dialog width="40px" v-model="modal.regVisible" class="relative">
    <h1 class="text-center c-#404040 text-22px font-normal mb-1.5">
      账号注册
    </h1>
    <div class="pb-44px flex items-center justify-center w-fulll">
      <el-form name="register">
        <!-- 账号 -->
        <el-form--item name="account">
          <el-input v-model="account.value" placeholder="请输入账号" />
        </el-form--item>
        <!-- 密码 -->
        <el-form--item name="password">
          <el-input type="password" v-model="password.value" placeholder="请输入密码" />
        </el-form--item>
        <!-- 确认密码 -->
        <el-form--item name="re-password">
          <el-input type="password" v-model="password.value" placeholder="请输入密码" />
        </el-form--item>
        <!-- 注册 -->
        <el-form--item>
          <el-button type="primary" @click="handleFinish"
            class="flex items-center justify-center bg-#444b52 text-white rounded-full">
            <span>立即注册</span>
          </el-button>
        </el-form--item>
      </el-form>
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

const account = ref('');
const password = ref('');
const rePassword = ref('');

function handleFinish() {
  // 密码验证
  if (password.value !== rePassword.value) {
    ElMessage({
      message: '两次输入的密码不一致',
      type: 'warning'
    })
    return
  } else {
    // 账号验证
    if (user.users.account === account.value) {
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
