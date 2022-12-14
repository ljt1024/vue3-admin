// 以前是
// import Router from 'vue-router'
import {createRouter,createWebHashHistory} from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [{
            path: '/home',
            name: 'home',
            component: () => import('@/views/home/index.vue'),
            meta: { title: '首页', icon: 'House' },
        }]
    },
    {
        path: '/userManager',
        component: Layout,
        children: [{
            path: '/userManager',
            name: 'userManager',
            component: () => import('@/views/user/index.vue'),
            meta: { title: '用户管理', icon: 'User' },
        }]
    },
    {
        path: '/adminManager',
        component: Layout,
        children: [{
            path: '/adminManager',
            name: 'adminManager',
            component: () => import('@/views/admin/index.vue'),
            meta: { title: '管理员管理', icon: 'User' },
        }]
    },
    {
        path: '/roleManager',
        component: Layout,
        children: [{
            path: '/roleManager',
            name: 'roleeManager',
            component: () => import('@/views/role/index.vue'),
            meta: { title: '文章管理', icon: 'Document' },
        }]
    },
    {
        path: '/tagsManager',
        component: Layout,
        children: [{
            path: '/tagsManager',
            name: 'tagsManager',
            component: () => import('@/views/tags/index.vue'),
            meta: { title: '标签管理', icon: 'PriceTag' },
        }]
    },
    {
        path: '/roleManager',
        component: Layout,
        children: [{
            path: '/roleManager',
            name: 'roleManager',
            component: () => import('@/views/trole/index.vue'),
            meta: { title: '角色管理', icon: 'User' },
        }]
    },
    {
        path: '/404',
        component: () => import('@/views/404.vue'),
        hidden: true
    },
    // // 404 page must be placed at the end !!!
    { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
]

// const createRouters = () => createRouter({
//
//     scrollBehavior: () => ({ y: 0 }),
//     routes: constantRoutes
// })

/*
* 新的 history 配置取代 mode
* */
const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
})

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter() {
//     const newRouter = createRouter({})
//     router.matcher = newRouter.matcher // reset router
// }

export default router

