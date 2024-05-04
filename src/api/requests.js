import axios from "axios";
//引入进度条progress
import progress from "nprogress"
import "nprogress/nprogress.css"
import store from "@/store";


//创建axios并配置
const requests = axios.create({
    baseURL:"/api",
    timeout:5000,
})
//请求拦截器
requests.interceptors.request.use((config)=>{
    if (store.state.detail.uuid_token) config.headers.userTempId = store.state.detail.uuid_token
    if (store.state.user.token) config.headers.token = store.state.user.token
    progress.start()
    return config
},(error)=>{
    return Promise.reject(error)
})
//响应拦截器
requests.interceptors.response.use((response)=>{
    progress.done()
    return response.data
},(error)=>{
    return Promise.reject(error)
})
export default requests











