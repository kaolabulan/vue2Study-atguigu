//配置路由
import Vue from "vue";
import VueRouter from "vue-router";
//使用插件
Vue.use(VueRouter)
//引路由组件
import Home from "@/pages/Home/index.vue";
import Search from "@/pages/Search/index.vue";
import Login from "@/pages/Login/index.vue";
import Register from "@/pages/Register/index.vue";
import Detail from "@/pages/Detail/index.vue";
import AddCartSuccess from "@/pages/AddCartSuccess/index.vue";
import ShopCart from "@/pages/ShopCart/index.vue";
import Trade from "@/pages/Trade/index.vue";
import Pay from "@/pages/Pay/index.vue";
import PaySuccess from "@/pages/PaySuccess/index.vue";
import Center from "@/pages/Center/index.vue";
//引入二级路由
import myOrder from "@/pages/Center/myOrder.vue";
import groupOrder from "@/pages/Center/groupOrder.vue";
//引入仓库
import store from "@/store";

let router = new VueRouter({
    routes:[
        {
            path:"/home",
            name:"home",
            component:Home,
            meta:{show:true},
        },
        {
            //可以在配置路由params传参时，在占位的后面加上一个 ？ 号，代表params 参数可传可不传
            path:"/search/:keyword?",
            component:Search,
            meta:{show:true},
            name:"search"
        },
        {
            path:"/login",
            component:Login,
            meta:{show:false},
        },
        {
            path:"/register",
            component:Register,
            meta:{show:false},
        },
        {
            path:"/detail/:skuId?",
            name:"detail",
            component:Detail,
            meta:{show:true},
        },
        {
            path:"/addcartsuccess",
            name:"addcartsuccess",
            component:AddCartSuccess,
            meta:{show:true},
        },
        {
            path:"/shopcart",
            name:"shopcart",
            component:ShopCart,
            meta:{show:true},
        },
        {
            path:"/trade",
            component:Trade,
            meta:{show:true},
            //路由独享守卫
            beforeEnter(to,from,next){
                //页面刷新 刷新时，路由默认是从‘/’跳转到自己
                console.log(from)
                //
                if (from.name==='shopcart'||from.path==='/'||from.name==='pay'){
                    next()
                }else {
                    next(false)
                }
            }
        },
        {
            path:"/pay",
            name:'pay',
            component:Pay,
            meta:{show:true},
            //独享路由守卫
            beforeEnter(to,from,next){
                console.log(from)
                if (from.path==="/trade"||from.path==='/'){
                    next()
                }else {
                    next(false)
                }
            }
        },
        {
            path:"/paysuccess",
            component:PaySuccess,
            meta:{show:true},
            beforeEnter(to,from,next){
                if (from.name==='pay'||from.path==='/'){
                    next()
                }else {
                    next(false)
                }
            }
        },
        {
            path:"/center",
            component:Center,
            meta:{show:true},
            children:[
                {
                    path:'myorder',
                    component:myOrder,
                },
                {
                    path:'grouporder',
                    component:groupOrder,
                },
                //重定向 默认访问center即myorder redirect
                {
                    path:'/center',
                    redirect:'/center/myorder'
                }
            ]
        },
        //重定向 首次访问定位首页 redirect
        {
            path:"*",
            redirect:"/home",
        },
    ],
    scrollBehavior(to,from,savedPOsition){
        return {y:0}
    },
})
//全局路由守卫 前置路由守卫
router.beforeEach(async (to,from,next)=>{
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    //判断登录 有token时 在跳转登录和注册时改为跳转home
    if (token){
        //登录后 在跳转登录和注册时改为跳转home
        if (to.path==='/login'||to.path==='/register'){
            next('/home')
        }else {
            //登录后 跳转普通页面 判断是否有userInfo 有就跳转，没有就获取后在跳转
            if (name){
                next()
            }else {
                try {
                    await store.dispatch('getUserInfo')
                    next()
                }catch (e) {
                    //如果有token 但是getUserInfo请求失败 说明token失效了 清除失效token重新登陆
                    await store.dispatch('logOut')
                    next('/login')
                }
            }
        }
    }else {
        //没有登录无法访问 /trade /pay /paysuccess /center 并跳转登录
        console.log(to.path)
        let toPath=to.path
        if (toPath.indexOf('/trade')!==-1||toPath.indexOf('/pay')!==-1||toPath.indexOf('/center')!==-1){
            next('/login?toPath='+toPath)
        }else {
            next()
        }
    }
})
export default router