<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
                <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
                <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script setup lang="ts">
    const { pathToRegexp } = import.meta.globEager("path-to-regexp")
    import { useRoute, useRouter } from 'vue-router'
    import { ref } from 'vue'
    const route = useRoute()
    const router = useRouter()
    const levelList = ref()
    let pathToRegexps:any = pathToRegexp
    const getBreadcrumb = ()=> {
        // only show routes with meta.title
        let matched: any = route.matched.filter(item => item.meta && item.meta.title)
        const first = matched[0]

        if (!isDashboard(first)) {
            matched = [{ path: '/home', meta: { title: 'home' }}].concat(matched)
        }

        levelList.value = matched.filter((item:any) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }

    const isDashboard = (route:any)=> {
        const name = route && route.name
        if (!name) {
            return false
        }
        return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    }
    const pathCompile = (path:any)=> {
        // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
        const { params } = route
        var toPath = pathToRegexps.compile(path)
        return toPath(params)
    }
    const handleLink = (item:any) => {
        const { redirect, path } = item
        if (redirect) {
            router.push(redirect)
            return
        }
        router.push(pathCompile(path))
    }
    getBreadcrumb()
    // export default {
    //     data() {
    //         return {
    //             levelList: null
    //         }
    //     },
    //     watch: {
    //         $route() {
    //             this.getBreadcrumb()
    //         }
    //     },
    //     created() {
    //         this.getBreadcrumb()
    //     },
    //     methods: {
    //
    //     }
    // }
</script>

<style lang="scss" scoped>
    .app-breadcrumb.el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        line-height: 50px;
        margin-left: 8px;

        .no-redirect {
            color: #97a8be;
            cursor: text;
        }
    }
</style>
