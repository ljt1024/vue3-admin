<template>
    <div class="header">
        <Logo :isCollapse="isCollapse" @getCollapse="(value)=> {isCollapse = value}"/>
        <User/>
    </div>
    <div class="content-wrap">
        <div class="aside">
            <el-menu
                    :default-active="currentKey"
                    class="el-menu-vertical-demo"
                    :collapse="isCollapse"
                    @select="handleSelect"
                    :router="true"
            >
                <el-menu-item index="/home" >
                    <el-icon><icon-menu /></el-icon>
                    <template #title>首页</template>
                </el-menu-item>
                <el-menu-item index="/userManager">
                    <el-icon><icon-menu/></el-icon>
                    <template #title>用户管理</template>
                </el-menu-item>
                <el-menu-item index="/adminManager">
                    <el-icon><icon-menu/></el-icon>
                    <template #title>管理员管理</template>
                </el-menu-item>
                <el-menu-item index="/articleManager">
                    <el-icon><document /></el-icon>
                    <template #title>文章管理</template>
                </el-menu-item>
                <el-menu-item index="/tagsManager">
                    <el-icon><setting/></el-icon>
                    <template #title>标签管理</template>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="right-wrap" :style="isCollapse ? 'width:calc(100% - 64px)' : 'width: calc(100% - 200px)'">
            <Tags/>
            <div class="container">
                <router-view v-slot="{ Component }">
                    <transition name="fade-transform" mode="out-in">
                        <component :is="Component"></component>
                    </transition>
                </router-view>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Logo from './components/Logo.vue'
    import User from './components/User.vue'
    import Nav from './components/Nav.vue'
    import Tags from './components/TagsView/index.vue'
    import { useRouter, useRoute } from 'vue-router'
    import { constantRoutes } from '@/router'
    import { ref } from 'vue'
    import {
        Document,
        Menu as IconMenu,
        Location,
        Setting,
    } from '@element-plus/icons-vue'
    const router = useRouter()
    const route = useRoute()
    const isCollapse = ref(false)
    let currentKey = ref('/')
    currentKey.value = router.currentRoute.value.fullPath
    const handleSelect = (key: string, keyPath: string[]) => {
        currentKey.value = key
    }
    const turn = () => {
        router.push('/userManager')
    }

</script>

<style lang="scss" scoped>
    .el-menu-vertical-demo {
        height: 100%;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
    }
    .header {
        border-bottom: 1px solid #eee;
        padding: 0px 16px 0px 10px;
        display: flex;
        justify-content: space-between;
        height: 60px;
        line-height: 60px;
    }
    .content-wrap {
        display: flex;
        height: calc(100vh - 61px);
        .right-wrap {
            .container {
                padding: 15px;
            }
        }
    }
</style>
