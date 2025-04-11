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
        ref="loginFormRef"
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
            @click="submitForm(loginFormRef)"
          >
            {{ formType ? '立即注册' : '立即登录' }}

          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </el-row>
</template>
<script setup>
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { ref, reactive, computed, toRaw } from 'vue'
import { getCode, login, userAuthentication, menuPermission } from '../../api'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

// console.log('@@@@@@@@@@@ElMessage', ElMessage.success('成功'))
// 通过vite插件动态获取图片路径（官方文档：https://cn.vite.dev/guide/assets.html#importing-asset-as-url）
const imgUrl = new URL('../../../public/login-head.png', import.meta.url).href

// 切换表单(0注册，1登录)
const formType = ref(0)

const loginFormRef = ref()

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

// 拿到vuex中的菜单权限数据
const routerList = computed(() => store.state.menu.routerList)

// 定义flag变量，检测用户是否点击了获取验证码
let flag = false

// 验证码部分
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
  // 用于发送验证码
  getCode({
    tel: loginForm.userName
  }).then(({ data }) => {
    console.log('@@@@@@@@@@@data', data)
    if (data.code === 10000) {
      ElMessage({
        message: '请输入正确的手机号',
        type: 'warning',
      })
    }
  })
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

// 用户没有输入账号密码时，点击立即登录和立即注册按钮触发表单校验
const submitForm = async (formEl) => {
  if (!formEl) return
  // 手动触发表单校验
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!', loginForm)
      // 注册页面
      if (formType.value) {
        userAuthentication(loginForm).then(({ data }) => {
          if (data.code === 10000) {
            ElMessage.success('注册成功，请登录')
            formType.value = 0
          }
        }
        )
      } else {
        // 登录页面
        login(loginForm).then(({ data }) => {
          if (data.code === 10000) {
            ElMessage.success('登录成功!')
            console.log('登录成功', data)
            // 将token和用户信息缓存到浏览器，存入localStorage
            localStorage.setItem('pz_token', data.data.token)
            // userInfo是一个对象类型，需要转成json字符串存入localStorage
            localStorage.setItem('pz_userInfo', JSON.stringify(data.data.userInfo))
            // 调用一个获取权限的接口，获取用户菜单权限，权限足够时，跳转到首页
            menuPermission().then(({ data }) => {
              // console.log('@@@@@@@@@@@menuPermission', data)
              // 将用户菜单权限的数据data.data存入vuex中，供其他页面使用
              store.commit('dynamicMenu', data.data)
              // 成功拿到数据之后，设置动态路由
              console.log('@@@@@@@@@@@routerList', routerList)
              // 将相应路由数据转化为普通路由数据
              toRaw(routerList.value).forEach(item => {
                // 进行动态路由的添加，只保留主路由，其他可以注释掉
                router.addRoute('main', item)
              })
              router.push('/')
            })

          }
        })

      }
    } else {
      console.log('error submit!', fields)
    }
  })


}

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