import {reqGetTradeInfo} from "@/api";

const state={
    tradeInfo:{},
}
const mutations={
    GETTRADEINFO(state,data){
        state.tradeInfo=data
    }
}
const actions={
    async getTradeInfo({commit}){
        let result = await reqGetTradeInfo()
        if (result.code===200){
            commit('GETTRADEINFO',result.data)
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters={
    userAddressList(state){
        return state.tradeInfo.userAddressList||[]
    },
    detailArrayList(state){
        return state.tradeInfo.detailArrayList||[]
    },
    totalNum(state){
        return state.tradeInfo.totalNum||''
    },
    originalTotalAmount(state){
        return state.tradeInfo.originalTotalAmount||''
    },
    tradeNo(state){
        return state.tradeInfo.tradeNo||''
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
}