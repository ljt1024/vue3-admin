<template>
    <div class="loginWrap">
        <div class="left">
            <img src="@/assets/images/left.png" alt="">
        </div>
        <div class="loginForm">
            <div class="title">后台管理系统</div>
            <el-form :model="form"  label-position="left" :rules="rules" ref="ruleFormRef">
                <el-form-item label="" prop="username">
                    <el-input v-model="form.username" placeholder="用户名">
                        <template #prefix>
                            <el-icon :size="18"><User /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input v-model="form.password" type="password" show-password placeholder="密码">
                        <template #prefix>
                            <el-icon :size="18"><Lock /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit(ruleFormRef)" class="loginBtn" icon="right">登录</el-button>
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
   import { User, Lock } from '@element-plus/icons-vue'
   import type { FormInstance, FormRules } from 'element-plus'
   import { useUserStore } from '@/store/user'
   import { ElNotification } from 'element-plus'
   import { timeFix } from '@/utils/tools'

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
                   setTimeout(()=>{
                       ElNotification({
                           title: '欢迎',
                           message: `${timeFix()}!尊敬的${form.username},欢迎您回来`,
                           type: 'success',
                       })
                   },500)
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
        width: 260px;
        height: 300px;
        border: 1px solid #eee;
        border-radius: 4px;
        position: absolute;
        padding: 40px;
        right: 0%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        background-color: #fff;
        .title {
            color: #409eff;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 60px;
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
