import {reqCartList,reqDeleteCart,reqCheckCart} from "@/api";

const state={
    cartList:[],
}
const mutations={
    GETCARTLIST(state,data){
        state.cartList = data[0].cartInfoList
    }
}
const actions={
    async getCartLIst({commit}){
        let result = await reqCartList()
        if (result.code===200) commit('GETCARTLIST',result.data)
    },
    async deleteCart({commit},skuId){
        let result = await reqDeleteCart(skuId)
        if (result.code===200){
            //返回成功的标记
            return 'ok'
        }else {
            //返回失败的标记  报错
            return Promise.reject(new Error('faile'))
        }
    },
    async checkCart({commit},{skuID,isChecked}){
        let result = await reqCheckCart(skuID,isChecked)
        if (result.code===200){
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
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