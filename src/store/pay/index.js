import {reqMyOrder, reqPayInfo, reqPayStatus, reqSubmitOrder} from "@/api";

const state={
    payInfo:{},
    myOrderInfo:{}
}
const mutations={
    GETPAYINFO(state,data){
        state.payInfo=data
    },
    GETMYORDER(state,data){
        state.myOrderInfo=data
    }
}
const actions={
    async getSubmitOrder({commit},{tradeNo,data}){
        let result = await reqSubmitOrder(tradeNo,data)
        if (result.code===200){
            return result.data
        }else {
            return Promise.reject(new Error(result.message))
        }
    },
    //获取订单支付信息
    async getPayInfo({commit},orderId){
        let result = await reqPayInfo(orderId)
        if (result.code===200){
            commit('GETPAYINFO',result.data)
        }
    },
    //查询支付订单状态
    async getPayStatus({commit},orderId){
        let result = await reqPayStatus(orderId)
        if (result.code===200){
            return 'ok'
        }else {
            return Promise.reject(new Error(result.message))
        }
    },
    // 获取我的订单列表
    async getMyOrder({commit},{page,limit}){
        let result = await reqMyOrder(page,limit)
        if (result.code===200){
            commit('GETMYORDER',result.data)
        }
    }
}
const getters={}
export default {
    state,
    mutations,
    actions,
    getters
}