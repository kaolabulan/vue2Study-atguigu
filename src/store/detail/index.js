import {reqAddOrUpdateShopCart, reqGoodList} from "@/api";
import {getUUID} from "@/urils/uuid_token";

const state ={
    goodList:{},
    uuid_token:getUUID(),
}
const mutations = {
    GETGOODLIST(state,data){
        state.goodList = data
    }
}
const actions = {
    async getGoodList({commit},skuId){
        let result = await reqGoodList(skuId)
        if (result.code === 200) commit('GETGOODLIST',result.data)
    },
    //添加到购物车(对已有物品进行数量改动)  skuNum变化量
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        //async函数执行返回的是一个Promise【要么成功，要么失败】
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if (result.code===200){
            //返回成功的标记
            return 'ok'
        }else {
            //返回失败的标记  报错
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {
    categoryView(state){
        return state.goodList.categoryView||{}
    },
    skuInfo(state){
        return state.goodList.skuInfo||{}
    },
    spuSaleAttrList(state){
        return state.goodList.spuSaleAttrList||[]
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
}