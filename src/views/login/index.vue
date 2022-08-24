<template>
    <div class="loginWrap">
        <div class="left">
            <img src="@/assets/images/left.png" alt="">
        </div>
        <div class="loginForm">
            <div class="title">后台管理系统</div>
            <el-form :model="form" label-width="80px" label-position="left" :rules="rules" ref="ruleFormRef">
                <el-form-item label="用户名:" prop="username">
                    <el-input v-model="form.username" />
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                    <el-input v-model="form.password" type="password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="onSubmit(ruleFormRef)" class="loginBtn" icon="right">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
   import { login } from '@/api/login'
   import { useRouter } from 'vue-router'
   import { reactive, ref } from 'vue'
   import md5 from 'js-md5'
   import type { FormInstance, FormRules } from 'element-plus'
   import { useUserStore } from "@/store/user"
   const router = useRouter()
   const user = useUserStore()
   const form = reactive({
       username: '',
       password: ''
   })
   const ruleFormRef = ref<FormInstance>()
   const rules = reactive<FormRules>({
      username:{ required: true, message: '请输入用户名', trigger: 'blur' },
      password:{ required: true, message: '请输入密码', trigger: 'blur' },
   })
   const onSubmit = async (formEl: FormInstance | undefined) => {
       if (!formEl) return
       await formEl.validate(async(valid, fields) => {
           if (valid) {
               const result = await user.loginUser({username:form.username, password: md5(form.password)})
               if(result && result.code === 200) {
                   router.push({name: 'home'})
               }
           }
       })
   }
   const submitLogin = ()=> {
       login({username:form.username, password: md5(form.password)}).then(res=> {
           console.log(res);
       })
   }
</script>

<style scoped lang="scss">
.loginWrap {
    background-image: url('@/assets/images/loginBg.png');
    background-size: 100% 100%;
    height: 100vh;
    width: 100vw;
    position: relative;
    .left {
        position: absolute;
        left: 30%;
        top: 50%;
        transform: translate(-50%, -50%);
        img {
            width: 600px;
            height: 600px;
        }
    }
    .loginForm {
        width: 300px;
        height: 240px;
        border: 1px solid #eee;
        border-radius: 20px;
        position: absolute;
        padding: 40px;
        right: 0%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        .title {
            color: #fff;
            font-size: 24px;
            margin-bottom: 20px;
            text-align: center;
        }
        .el-form-item {
            margin-bottom: 30px;
        }
        ::v-deep .el-input__wrapper {
            padding: 4px 11px;
        }
        ::v-deep .el-form-item__label {
            color: #fff;
        }
        .loginBtn {
            width: 400px;
        }
    }
}
</style>
