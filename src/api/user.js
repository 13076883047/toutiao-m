import request from '@/utils/request'

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