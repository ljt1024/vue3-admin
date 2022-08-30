import router from './router'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { useUserStore } from '@/store/user'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
//const user = useUserStore() 不能全局调用 getActivePinia was called with no active Pinia

router.beforeEach(async(to, from, next) => {
    const user = useUserStore()
    // start progress bar
    NProgress.start()

    // set page title
    // document.title = getPageTitle(to.meta.title)
    if (typeof to.meta.title === "string") {
        document.title = to.meta.title
    }
    // determine whether the user has logged in
    const hasToken = localStorage.getItem('token')

    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
            NProgress.done()
        } else {
            const hasGetUserInfo = user.username
            console.log(hasGetUserInfo);
            if (hasGetUserInfo) {
                next()
            } else {
                try {
                    // get user info
                    await user.getUser()
                    next()
                } catch (error:any) {
                    console.log(error, '+++++++++++')
                    // remove token and go to login page to re-login
                    await user.resetToken()
                    // ElMessage.error(error)
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        /* has no token*/

        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
