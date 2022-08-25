import axios, { Axios, AxiosResponse, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'

interface T {
    data: {
        data?: object,
        code?: number,
        msg?: string,
    }
}
declare module "axios" {
    interface AxiosResponse<T = any> {
        code?: number,
        msg?: string,
        total?: number|null
        // 这里追加你的参数
    }
    export function create(config?: AxiosRequestConfig): AxiosInstance;
}

// create an axios instance
const service = axios.create({
    baseURL:  'http://localhost:3003', // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 1000 * 30 // request timeout
})

// request interceptor
service.interceptors.request.use(
    (config:any) => {
        if (localStorage.getItem('token')) {
            config.headers['Authorization'] = localStorage.getItem('token')
        }
        return config
    },
    (error:any) => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)


// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    (response:T) => {
        if (response.data.code == 200) {
            return Promise.resolve(response.data)
        } else if (response.data.code == 205 ) {
            // token失效
            const user = useUserStore()
            user.resetToken()
        } else {
            // 其他错误状态码
            ElMessage.error(response.data.msg)
            return Promise.reject(response.data)
        }
        return response.data
    },
    (error:any) => {
        console.log('err' + error) // for debug
        // 未授权Unauthorized，可能是session过期
        if (error && error.response && error.response.status === 401) {

        } else {
            ElMessage.error({
                message: (error.response && error.response.data && error.response.data.msg) || error.message,
            })
        }
        return Promise.reject(error)
    }
)

export default service
