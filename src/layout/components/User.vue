<template>
    <div class="user">
        <el-dropdown @command="handleSelect">
            <div class="userInfo">
                 <img src="@/assets/vue.svg" alt="">
                 <span>张三</span>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore} from '@/store/user'

const router = useRouter()
const user = useUserStore()
const handleSelect = async (value:string|number|object):void => {
    if (value === 'loginOut') {
        await user.resetToken()
        router.push('/login')
    }
}
</script>

<style scoped lang="scss">
.user {
    cursor: pointer;
    margin-right: 10px;
    .userInfo {
        line-height: 60px;
    }
    img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;
    }
}
</style>
