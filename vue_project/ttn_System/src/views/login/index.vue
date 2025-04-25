<!--
 * @Description: Stay hungry，Stay foolish
 * @Author: ttn_02
 * @Date: 2025-05-22 22:08:06
 * @LastEditors: ttn_02
 * @LastEditTime: 2025-05-22 22:08:06
 -->
<template>
  <div class="login_container">
    <el-row>
      <el-col
        :span="12"
        :xs="0"
      ></el-col>
      <el-col
        :span="12"
        :xs="24"
      >
        <el-card class="login_form">
          <h1>Vue-Admin</h1>
          <el-form
            :model="loginForm"
            :rules="rules"
            ref="loginForms"
          >
            <el-form-item prop="username">
              <el-input
                :prefix-icon="User"
                v-model="loginForm.username"
                clearable
                placeholder="Username"
                size="large"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                :prefix-icon="Lock"
                show-password
                v-model="loginForm.password"
                size="large"
                placeholder="Password"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item prop="verifyCode">
              <el-input
                :prefix-icon="Warning"
                show-password
                v-model="loginForm.verifyCode"
                placeholder="VerifyCode"
                size="large"
                maxlength="4"
              >
                <template #append>
                  <Identify
                    :identifyCode="identifyCode"
                    @click="refreshCode"
                  />
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock, Warning } from '@element-plus/icons-vue'
import { Ref, computed, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'
import useUserStore from '@/store/modules/user'
import Identify from '@/components/VerifyCode/index.vue'
// VerifyCode import

let $router = useRouter()
let $route = useRoute()
// 用于登陆时登录按钮的转圈圈加载效果
let loading = ref(false)

const identifyCode = ref('1234')
const identifyCodes = ref('1234567890abcdefjhijklinopqrsduvwxyz')

// 重置验证码
const refreshCode = () => {
  identifyCode.value = ''
  makeCode(identifyCode, 4)
}

const makeCode = (o: Ref<any>, l: number) => {
  for (let i = 0; i < l; i++) {
    identifyCode.value +=
      identifyCodes.value[randomNum(0, identifyCodes.value.length)]
  }
}

const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}

let useStore = useUserStore()
// 获取el-form组件实例（里面有方法validate）
let loginForms = ref()

const loginForm = reactive({
  username: 'admin',
  password: '111111',
  verifyCode: '1234',
})



// 点击登录需要做的事情
// 1. 通知仓库发请求、请求成功跳转首页、请求失败错误提示
const login = async () => {
  // el-form组件实例的validate方法，会返回Promise实例（resolve和reject）用于验证校验的表单是否成功和失败
  // 等校验通过后再发请求
  await loginForms.value.validate()
  // 点击登录按钮时，按钮转圈圈加载效果
  loading.value = true
  try {
    await useStore.userLogin(loginForm)
    // 登陆时判断是否携带有query参数，有的话就往query参数跳转，没有的话就跳转到首页
    // 业务 临时有事退出登录（保留当时路由在query参数） 再登陆回来时，会自动跳转回之前的页面
    let redirect: string = $route.query.redirect as string
    $router.push({ path: redirect || '/' })

    $router.push('/')
    ElNotification({
      type: 'success',
      message: '登陆成功',
      // 从工具文件夹utils/time里面封装获取当前时间，用于表示上午下午晚上
      title: `Hi, ${getTime()}好`,
    })
    // 登录成功，按钮停止转圈圈加载效果
    loading.value = false
  } catch (error) {
    // 登录失败，按钮停止转圈圈加载效果
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}


// 自定义校验规则函数
// rule 校验规则对象
// value 表单元素的文本内容
// callback 回调函数，用于返回校验结果，
// 如果校验通过，则调用callback()放行，否则调用callback(new Error('错误提示信息'))打印错误信息并放行
const validatorUsername = (rule: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error('请输入账号'))
  } else {
    callback()
  }
}

const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error('请输入密码'))
  } else if (value.length < 6 || value.length > 16) {
    callback(new Error('密码应为6~16位的任意组合'))
  } else {
    callback()
  }
}

const validatorVerifyCode = (rule: any, value: any, callback: any) => {
  console.log(value, identifyCode.value)

  if (value.length === 0) {
    callback(new Error('请输入验证码'))
  } else if (value.length < 4) {
    callback(new Error('请输入正确的验证码'))
  } else if (identifyCode.value !== value) {
    callback(new Error('请输入正确的验证码'))
  } else if (identifyCode.value === value) {
    callback()
  }
}
const rules = {
  // trigger:触发校验表单的时机 change->文本发生变化 blur->失去焦点
  username: [
    {
      trigger: 'change',
      validator: validatorUsername,
    },
  ],
  password: [
    {
      trigger: 'change',
      validator: validatorPassword,
    },
  ],
  verifyCode: [
    {
      trigger: 'blur',
      validator: validatorVerifyCode,
    },
  ],
}

// ../../assets/images/0050.png
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  // 用于覆盖父盒子的背景
  background-size: cover;
  position: fixed;
  background: url('@/assets/images/background.jpg') no-repeat;

  .login_form {
    // 相对于父盒子的位置进行定位
    position: relative;
    width: 55%;
    top: 25vh;
    left: 10vw;
    padding: 10px;
    background: transparent;

    h1 {
      background: linear-gradient(to right, blue, rgb(35, 60, 70));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 40px;
      text-align: center;
      font-weight: 700;
      margin-bottom: 40px;
      margin-top: -10px;
    }

    .login_btn {
      width: 100%;
    }
  }
}

.el-card {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}

@media screen and (max-width: 768px) {
  .login_container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;

    .login_form {
      width: 100%;
      max-width: 400px;
      padding: 40px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 10px;
      position: static;
      top: auto;
      left: auto;

      h1 {
        font-size: 32px;
        margin-bottom: 30px;
        margin-top: 0;
      }
    }
  }
}
</style>
