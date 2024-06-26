//引入三级联动接口
import {reqBannerList, reqCategoryList, reqFloorList,} from "@/api"

const state ={
    categoryList:[],
    bannerList:[],
    floorList:[],
}
const mutations ={
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,data){
        state.bannerList = data
    },
    GETFLOORLIST(state,data){
        state.floorList = data
    }

}
const actions ={
    async categoryList({commit}){
        // async await 拿到Promise结果 reqCategoryList()返回Promise
        let result = await reqCategoryList()
        if (result.code === 200) {
            commit('CATEGORYLIST',result.data)
        }
    },
    async getBannerList({commit}){
        let result = await reqBannerList()
        if (result.code===200) commit('GETBANNERLIST',result.data)
    },
    async getFloorList({commit}){
        let result = await reqFloorList()
        if (result.code === 200)  commit('GETFLOORLIST',result.data)
    }
}
const getters ={}

export default {
    state,
    mutations,
    actions,
    getters,
}