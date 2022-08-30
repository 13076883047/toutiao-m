import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage.js'

Vue.use(Vuex)

/*
  目标1: 存储用户token
    方法: vuex容器(响应式、获取方便) + 本地存储(持久化)
*/
const USER_TOKEN = 'TOUTIAO_TOKEN'
export default new Vuex.Store({
  state: {
    // 传入的是一个对象,包括用户token等信息
    // user: null
    // user: JSON.parse(window.localStorage.getItem(USER_TOKEN))
    use: getItem(USER_TOKEN)
  },
  getters: {
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 为了防止刷新丢失数据,将数据存储到本地
      // window.localStorage.setItem(USER_TOKEN, JSON.stringify(data))
      setItem(USER_TOKEN, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
