<template>
    <div class="header">
        <Logo @getCollapse="getCollapse"/>
        <User/>
    </div>
    <div class="content-wrap">
        <Sidebar/>
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
    import Sidebar from './components/Sidebar.vue'
    import { useSetStore } from '@/store/set'
    import { ref } from 'vue'
    const set = useSetStore()
    let isCollapse = ref(false)
    isCollapse.value = set.isCollapse
    const getCollapse = ()=> {
        set.changeCollapse()
        isCollapse.value = set.isCollapse
    }
</script>

<style lang="scss" scoped>
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
