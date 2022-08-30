import request from '@/utils/request'
// import store from '@/store/index.js'

// 登录验证
export const login = data => {
    return request({
        method: 'POST',
        url: 'authorizations',
        data
    })
}

// 手机号验证
export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `sms/codes/${mobile}`
    })
}

// 获取用户信息
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: 'user'
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}