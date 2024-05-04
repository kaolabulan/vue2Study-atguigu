//AIP统一管理
import requests from "@/api/requests";
import mockAxios from "@/api/mockAxios";
import {post} from "axios";
import * as url from "url";
///api/product/getBaseCategoryList get
//三级联动接口
export const reqCategoryList = () => {
    //发请求
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get',
    })
}

export const reqBannerList = () => mockAxios.get('banner')
export const reqFloorList = () => mockAxios.get('floor')

export const reqSearchList = (params) => requests({
    url: '/list',
    method: "post",
    data: params,
})
export const reqGoodList = (skuId) => requests({url: "/item/"+skuId, method: "get",})
// 添加到购物车(对已有物品进行数量改动)
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests.post(`/cart/addToCart/${skuId}/${skuNum}`)
export const reqCartList = ()=>requests.get('/cart/cartList')
export const reqDeleteCart = (skuId)=>requests.delete(`/cart/deleteCart/${skuId}`)
export const reqCheckCart = (skuID,isChecked)=>requests.get(`/cart/checkCart/${skuID}/${isChecked}`)
//获取验证码 /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone)=>requests.get(`/user/passport/sendCode/${phone}`)
//注册用户 /api/user/passport/register
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:'post'})
//登录 /api/user/passport/login
export const reqUserLogin = (data)=>requests({url: '/user/passport/login',method:'post',data})
//token校验获取用户登录信息 /api/user/passport/auth/getUserInfo
export const reqGetUserInfo=()=>requests.get('/user/passport/auth/getUserInfo')
//退出登录 /api/user/passport/logout
export const reqLogOut=()=>requests.get('/user/passport/logout')
// 获取订单交易页信息 /api/order/auth/trade
export const reqGetTradeInfo=()=>requests.get('/order/auth/trade')
// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder =(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data})
//获取订单支付信息  /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId)=>requests.get(`/payment/weixin/createNative/${orderId}`)
//查询支付订单状态 /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus=(orderId)=>requests.get(`/payment/weixin/queryPayStatus/${orderId}`)
// 获取我的订单列表 /api/order/auth/{page}/{limit}
export const reqMyOrder=(page,limit)=>requests.get(`/order/auth/${page}/${limit}`)




