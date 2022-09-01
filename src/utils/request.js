/*
    请求模块
*/
import axios from 'axios'
import store from '@/store/index.js'

const request = axios.create({
    baseURL: 'http://toutiao.itheima.net/v1_0/'
})

// 目前先封装请求模块，未来还要封装 请求拦截器 和 响应拦截器
// 请求拦截器
request.interceptors.request.use(function (config) {
    // 请求发起时会经过这里
    // config 本次请求的配置对象
    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    // console.log(config)
    return config
}, function (error) {
    // 如果请求出错了(还没有发送出去) 会进入这里
    return Promise.reject(error)
})

export default request
