import { defineStore } from "pinia";
import { ref } from "vue";
import { ElMessage } from "element-plus";

// useUserStore接收了三个参数，第一个参数是store的名字，第二个参数是一个函数，函数返回一个对象，这个对象包含了store的状态，第三个参数是store的持久化配置
export const useUserStore = defineStore(
  "user",
  () => {
    // 当前用户名称
    const currentUser = ref("");
    // 是否登录
    const isLogin = ref("xdclass_user_is_login" === "true" ? true : false);
    // 注册用户信息
    const users = ref({
      account: "ttn",
      password: "123456",
    });
    // 登录
    const login = (account, password) => {
      const foundUser = users.value.find(
        (item) => item.account === account && item.password === password
      );
      if (foundUser) {
        localStorage.setItem("xdclass_uesr_is_login", "true");
        localStorage.setItem("xdclass_user_current_user", foundUser.account);
        ElMessage({
          message: "登录成功",
          type: "success",
        });
        isLogin.value = true;
        currentUser.value = foundUser.account;
      }
    };

    // 退出登录
    const logout = () => {
      isLogin.value = false;
      currentUser.value = "";
    };

    // 注册更新用户信息
    const register = (account, password) => {
      users.value = { account, password };
      localStorage.setItem(
        "xdclass_vue_users",
        JSON.stringify({
          account,
          password,
        })
      );
      localStorage.removeItem("xdclass_user_is_login", "true");
      isLogin.value = true;
    };
    return { currentUser, isLogin, users, login, register };
  },
  {
    //导入pinia插件pinia-plugin-persist，并配置持久化
    persist: {
      // store中的数据在浏览器本地存储中持久化
      enabled: true,
    },
  }
);
