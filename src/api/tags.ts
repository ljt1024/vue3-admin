import request from '@/utils/request'

export function getColumnList(params:object) {
    return request({
        url: '/api/columnList',
        method: 'get',
        params
    })
}



