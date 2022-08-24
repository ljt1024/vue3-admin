import request from '@/utils/request'

export function getUserList(params:object) {
    return request({
        url: '/api/userList',
        method: 'get',
        params
    })
}



