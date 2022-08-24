<template>
    <div class="logo">
        <div>
            <img src="@/assets/vue.svg" alt="">
            <span>后台管理系统</span>
        </div>
        <el-icon @click="toggle" :size="20" class="collapse" v-if="isCollapse"><Expand/></el-icon>
        <el-icon @click="toggle" :size="20" class="collapse" v-else><Fold/></el-icon>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    const emit = defineEmits(['getCollapse'])
    const isCollapse = ref(false)
    const toggle = ():void => {
        isCollapse.value =! isCollapse.value
        emit('getCollapse', isCollapse.value)
    }
</script>

<style scoped lang="scss">
    img {
        vertical-align: middle;
    }
    .logo {
        display: flex;
        align-items: center;
        .collapse {
            cursor: pointer;
            margin-left: 16px;
            // 取消文字选中
            -moz-user-select:none;/*火狐*/
            -webkit-user-select:none;/*webkit浏览器*/
            -ms-user-select:none;/*IE10*/
            -khtml-user-select:none;/*早期浏览器*/
            user-select:none;
        }
    }
</style>
