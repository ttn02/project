<template>
  <el-row
    class="login-container"
    justify="center"
    align="middle"
  >
    <el-card style="max-width: 480px">
      <template #header>
        <div class="card-header">
          <img
            :src="imgUrl"
            alt=""
          >
        </div>
      </template>
      <div class="jump-link">
        <el-link
          type="primary"
          @click="handleChange"
        >
          {{ formType ? '返回登录' : '注册账号' }}
        </el-link>
      </div>
      <el-form
        :model="loginForm"
        style="max-width: 600px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <el-form-item prop="userName">
          <el-input
            v-model="loginForm.userName"
            placeholder="手机号"
            :prefix-icon="UserFilled"
          />
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            v-model="loginForm.passWord"
            placeholder="密码"
            type="password"
            :prefix-icon="Lock"
          />
        </el-form-item>
        <el-form-item
          v-if="formType"
          prop="validCode"
        >
          <el-input
            v-model="loginForm.validCode"
            placeholder="验证码"
            :prefix-icon="Lock"
          >
            <template #append>
              <span
                class="send-code"
                @click="countdownChange"
              >
                {{ countdown.validText }}
              </span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :style="{ width: '100%' }"
            @click="submitForm"
          >
            {{ formType ? '立即注册' : '立即登录' }}

          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </el-row>
</template>
<script setup>
import { UserFilled } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'

// 通过vite插件动态获取图片路径（官方文档：https://cn.vite.dev/guide/assets.html#importing-asset-as-url）
const imgUrl = new URL('../../../public/login-head.png', import.meta.url).href

// 切换表单(0注册，1登录)
const formType = ref(0)

// 表单数据,对应后端接口参数
const loginForm = reactive({
  userName: '',
  passWord: '',
  validCode: ''

})

// 发送验证码，进行倒计时
const countdown = reactive({
  validText: '获取验证码',
  time: 60,
})

// 定义flag变量，检测用户是否点击了获取验证码
let flag = false

const countdownChange = () => {
  // 防止重复点击
  if (flag) {
    return
  }

  //判断手机号格式是否正确（正则表达式）
  const phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
  if (!loginForm.userName || !phoneReg.test(loginForm.userName)) {
    return ElMessage({
      message: '请输入正确的手机号',
      type: 'warning',
    })
  }

  // 倒计时，定时器
  const intervalID = setInterval(() => {
    if (countdown.time <= 0) {
      countdown.validText = '获取验证码'
      countdown.time = 60
      // 完成倒计时，清除定时器
      clearInterval(intervalID);
      // 倒计时结束之后，重置flag
      flag = false
    } else {
      countdown.time -= 1
      countdown.validText = `剩余${countdown.time}秒`
    }
  }, 1000)
  flag = true
}

// 切换注册和登录
const handleChange = () => {
  formType.value = formType.value ? 0 : 1
}

// 账号校验规则
const validateUser = (rule, value, callback) => {
  // 账号不为空
  if (value === '') {
    callback(new Error('请输入账号'))
  } else {
    const phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
    phoneReg.test(value) ? callback() : callback(new Error('手机号格式不对,请输入正确的手机号'))
  }
}
// 密码校验规则
const validatePass = (rule, value, callback) => {
  // 密码不为空
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    const reg = /^[a-zA-Z0-9_-]{4,16}$/
    reg.test(value) ? callback() : callback(new Error('密码格式不对,需要4到16位字符,请使用字母、数字、下划线或减号'))
  }
}
// 表单校验规则
const rules = reactive({
  userName: [
    {
      validator: validateUser,
      // 失去焦点时触发校验，触发的时候会调上一行的函数
      trigger: 'blur'
    }
  ],
  passWord: [
    {
      validator: validatePass,
      // 失去焦点时触发校验，触发的时候会调上一行的函数
      trigger: 'blur'
    }
  ]
})

const submitForm = () => { }

</script>
<style lang="less" scoped>
:deep(.el-card__header) {
  padding: 0;
}

.login-container {
  height: 100%;

  .card-header {
    background-color: #899fe1;

    img {
      width: 430px;
    }
  }

  .jump-link {
    text-align: right;
    margin-bottom: 10px;
  }
}

.send-code:hover {
  cursor: pointer;

}
</style>