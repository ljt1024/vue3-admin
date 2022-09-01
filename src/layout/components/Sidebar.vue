<template>
    <div class="aside">
        <el-menu
                :default-active="currentKey"
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
                @select="handleSelect"
                :router="true"
        >
            <div v-for="item in constantRoutes" :key="item">
                <el-menu-item :index="item.children[0].path" v-if="item.children">
                    <el-icon><component :is="item.children[0].meta.icon"></component></el-icon>
                    <template #title>{{ item.children[0].meta.title }}</template>
                </el-menu-item>
            </div>

<!--            <el-menu-item index="/userManager">-->
<!--                <el-icon><icon-menu/></el-icon>-->
<!--                <template #title>用户管理</template>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="/adminManager">-->
<!--                <el-icon><icon-menu/></el-icon>-->
<!--                <template #title>管理员管理</template>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="/articleManager">-->
<!--                <el-icon><document /></el-icon>-->
<!--                <template #title>文章管理</template>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="/tagsManager">-->
<!--                <el-icon><setting/></el-icon>-->
<!--                <template #title>标签管理</template>-->
<!--            </el-menu-item>-->
        </el-menu>
    </div>
</template>

<script setup lang="ts">
    import { useRouter, useRoute } from 'vue-router'
    import { constantRoutes } from '@/router'
    import { useSetStore } from '@/store/set'
    // import {
    //     Document,
    //     Menu as IconMenu,
    //     Location,
    //     Setting,
    // } from '@element-plus/icons-vue'
    import { ref, watch } from 'vue'
    const set = useSetStore()
    const router = useRouter()
    const route = useRoute()
    let isCollapse = ref(false)
    let currentKey = ref('/')
    currentKey.value = router.currentRoute.value.fullPath
    const handleSelect = (key: string, keyPath: string[]) => {
        currentKey.value = key
    }
    watch(()=> set.isCollapse, (value)=>{
        console.log(value);
        isCollapse.value = value
    })
    console.log(constantRoutes)
</script>

<style scoped lang="scss">
    .el-menu-vertical-demo {
        height: 100%;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
    }
</style>
