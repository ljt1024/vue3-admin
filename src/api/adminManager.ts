import request from '@/utils/request'

export function getAdminList(params:object) {
    return request({
        url: '/api/admin/adminList',
        method: 'get',
        params
    })
}



