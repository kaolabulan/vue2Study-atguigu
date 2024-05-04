import {reqGetCode,reqUserRegister,reqUserLogin,reqGetUserInfo,reqLogOut} from "@/api";
import {setToken,getToken,removeToken} from "@/urils/token";
//用户登录与注册仓库
const state={
    code:'',
    token:getToken(),
    userInfo:{}
}
const mutations={
    GETCODE(state,data){
        state.code=data
    },
    GETUSERINFO(state,data){
        state.userInfo = data
    },
    USERLOGIN(state,token){
        state.token=token
    },
    LOGOUT(state){
        state.token=''
        state.userInfo={}
        removeToken()
    }
}
const actions={
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        if (result.code===200){
            console.log(result.data)
            commit('GETCODE',result.data)
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
        }
    },
    async userRegister({commit},data){
        let result = await reqUserRegister(data)
        console.log(result)
        if (result.code===200){
            return  'ok'
        }else {
            return Promise.reject(new Error(result.message))
        }
    },
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        if (result.code===200){
            commit('USERLOGIN',result.data.token)
            setToken(result.data.token)
            return  'ok'
        }else {
            return Promise.reject(result.message)
        }
    },
    async getUserInfo({commit}){
        let result = await reqGetUserInfo()
        if (result.code===200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
        }
    },
    //退出登录
    async logOut({commit}){
        let result = await reqLogOut()
        if (result.code===200){
            commit('LOGOUT')
            return 'ok'
        }else {
            return Promise.reject('faile')
        }
    }
}
const getters={}
export default {
    state,
    mutations,
    actions,
    getters,
}