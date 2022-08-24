<template>
    <div class="notFound">
        <div class="content">
            <img src="@/assets/images/404.png" alt="">
            <el-button type="primary" icon="back" @click="back" class="back">返回首页</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import  { useRouter } from 'vue-router'
    const router = useRouter()
    const back = () => {
        router.push('/')
    }
</script>

<style scoped lang="scss">
 .notFound {
     height: 100vh;
     width: 100vw;
     position: relative;
     .content {
         position: absolute;
         top: 50%;
         left: 50%;
         margin-top: -320px;
         margin-left: -240px;
         text-align: center;
         img {
             width: 480px;
             height: 480px;
             display: block;
         }
         .back {
             margin-top: -180px;
         }
     }
 }
</style>
