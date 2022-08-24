import request from '@/utils/request'
export function login(data:object) {
    return request({
        url: '/api/admin/login',
        method: 'post',
        data
    })
}

export function getUser() {
    return request({
        url: '/api/admin/profile',
        method: 'get'
    })
}

