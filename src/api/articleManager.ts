import request from '@/utils/request'

export function getArticleList(params:object) {
    return request({
        url: '/api/articleList',
        method: 'get',
        params
    })
}



