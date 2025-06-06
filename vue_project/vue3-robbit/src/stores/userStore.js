import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'

export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()
  //1.定义管理用户数据的state
  const userInfo = ref({})
  //2.定义获取接口数据的action函数
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.data.result
    //合并购物车（返回一个新数组）
    await mergeCartAPI(cartStore.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    cartStore.updateNewList()
  }
  
  //退出时清除用户数据
  const clearUserInfo = () => {
    userInfo.value = {}
    //请求pinia中的购物车数据
    cartStore.clearCart()
  }

  // 3. 以对象的格式把state和action return
  return { userInfo, getUserInfo, clearUserInfo }
},
  //持久化
  {
    persist: true,
  }
)