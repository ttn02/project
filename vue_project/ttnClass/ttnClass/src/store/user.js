import { defineStore } from "pinia";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useModalStore } from "./modal.js";

const modal = useModalStore();

// useUserStore接收了三个参数，第一个参数是store的名字，第二个参数是一个函数，函数返回一个对象，这个对象包含了store的状态，第三个参数是store的持久化配置
export const useUserStore = defineStore(
  "user",
  () => {
    // 当前用户名称
    const currentUser = ref("");
    // 是否登录
    const storedLogin = localStorage.getItem("xdclass_user_is_login");
    const isLogin = ref(storedLogin === "true");
    // 注册用户信息
    const users = ref({
      account: "ttn",
      password: "123456",
    });
    // 登录
    const login = (account, password) => {
      console.log("账号:", account); // 检查数据是否传递
      console.log("密码:", password); // 检查数据是否传递
      const foundUser =
        users.value.account === account && users.value.password === password;
      if (foundUser) {
        ElMessage({
          message: "登录成功",
          type: "success",
        });
        isLogin.value = true;
        currentUser.value = foundUser.account;
        modal.switchLoginVisible();
      } else {
        ElMessage({
          message: "登录失败，账号或密码错误",
          type: "warning",
        });
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
      localStorage.removeItem("xdclass_user_is_login");
      isLogin.value = true;
    };
    return { currentUser, isLogin, users, login, register, logout };
  },
  {
    //导入pinia插件pinia-plugin-persist，并配置持久化
    persist: {
      // store中的数据在浏览器本地存储中持久化
      enabled: true,
    },
  }
);
