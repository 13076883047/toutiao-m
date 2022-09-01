import request from '@/utils/request';

// 1. 获取用户选择的频道
export const UserChannel = () => {
    return request({
        url: 'user/channels',
        method: 'GET'
    })
}

// 获取频道的相关内容
export const getChannelList = params => {
    return request({
        url: 'articles',
        method: 'GET',
        params
    })
}