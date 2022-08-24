import { defineStore } from 'pinia'
import { login, getUser } from '@/api/login'
export const useUserStore = defineStore('user', {
    state: ()=> {
        return {
            username: '',
            avatar: '',
            token: ''
        }
    },
    actions: {
         async loginUser(userForm:object) {
              try{
                  const result =  await login(userForm)
                  localStorage.setItem('token', result.data.token)
                  return result
              }catch (e) {
                  console.log(e)
                  return false
              }
        },
        async getUser() {
            try{
                const result = await getUser()
                localStorage.setItem('userInfo', result.data.user)
                this.username = result.data.user.username
                return result
            }catch (e:any) {
                throw new Error(e)
            }
        },
        resetToken() {
            this.token = ''
            this.username = ''
            this.avatar = ''
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
        }
    }
})
