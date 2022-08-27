/*
    请求模块
*/
import axios from 'axios'

const request = axios.create({
    baseURL: 'http://toutiao.itheima.net/v1_0/'
})

// 目前先封装请求模块，未来还要封装 请求拦截器 和 响应拦截器

export default request
